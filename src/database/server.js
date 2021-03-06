const yup = require('yup');
const jsonServer = require('json-server');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

const server = jsonServer.create();
const router = jsonServer.router('./src/database/db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(6)
    .max(16),
  companyId: yup.string().required(),
});

function findUserByEmail(email) {
  return router.db
    .get('users')
    .find({ email })
    .value();
}

function findUserById(id) {
  return router.db
    .get('users')
    .find({ id })
    .value();
}

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function checkToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decoded) => decoded !== undefined);
}

function hashPasswords(password) {
  return bcrypt.hash(password, 10);
}

async function isAuth(req) {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) {
    return false;
  }

  const {
    id, firstName, lastName, role, companyId,
  } = user;
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const accessToken = createToken({ email, password });
    const response = {
      token: accessToken,
      user: {
        id,
        firstName,
        lastName,
        role,
        companyId,
      },
      message: 'auth',
    };
    return response;
  }
  return false;
}

function addUserIdToCompanies(companyId, userId) {
  router.db
    .get('companies')
    .find({ id: companyId })
    .get('usersIds')
    .push(userId)
    .write();
}

async function addUserToDb(req) {
  const messages = {};
  return schema
    .validate(req.body, { abortEarly: false })
    .then(async () => {
      const hashedPassword = await hashPasswords(req.body.password);
      req.body.email = req.body.email.toLowerCase();
      await router.db
        .get('users')
        .push(
          Object.assign(req.body, {
            id: shortid.generate(),
            role: 'user',
            password: hashedPassword,
          }),
        )
        .write();

      const user = findUserByEmail(req.body.email);
      addUserIdToCompanies(user.companyId, user.id);
      if (user) {
        messages.message = 'User added';
        return messages;
      }
      messages.errors = 'Fail to add user';
      return messages;
    })
    .catch((err) => {
      messages.errors = err;
      return messages;
    });
}

function checkIfEmailIsTaken(req) {
  const user = router.db
    .get('users')
    .find({ email: req.body.email.toLowerCase() })
    .value();

  if (user) return { error: 'Email is taken' };

  return false;
}

function getAllCompanies() {
  const companies = router.db.get('companies').value();

  if (companies) return companies;

  return false;
}

function addProductsToOrder(order) {
  Object.assign(order, { productsOrder: [], id: shortid.generate() });
  order.orderPositionIds.forEach((position) => {
    const pos = router.db
      .get('orderPositions')
      .find({ id: position })
      .value();
    order.productsOrder.push(pos);
  });
  return order;
}

function returnOrdersForDifrentTypeOfUser(id) {
  const user = findUserById(id);
  if (user.role === 'admin') {
    const orders = router.db.get('orders').value();
    return orders;
  }

  const orders = router.db
    .get('orders')
    .filter({ companyId: user.companyId })
    .value();
  return orders;
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', async (req, res) => {
  const response = await isAuth(req);
  if (response) {
    return res.send(response);
  }
  return res.status(401).json({ error: 'Email or password is incorrect!' });
});
server.post('/registration', async (req, res) => {
  const check = await checkIfEmailIsTaken(req);
  if (check.error) return res.status(422).json({ error: check.error });
  const register = await addUserToDb(req);
  if (register.message) return res.json({ message: register.message });
  return res.status(422).json({ errors: register.errors.errors });
});
server.get('/companies', async (req, res) => {
  const companies = await getAllCompanies();
  if (companies) return res.json(companies);
  return res.json({ error: 'No comapnies in DB' });
});

server.post('/login', async (req, res) => {
  const response = await isAuth(req);
  if (response) {
    return res.send(response);
  }
  return res.status(401).json({ error: 'Email or password is incorrect!' });
});

server.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (checkToken(token)) {
      return next();
    }
  }

  return res.status(401).json({ error: 'Unauthorized' });
});
// This routes are auth by token
server.get('/orders', async (req, res) => {
  res.json(returnOrdersForDifrentTypeOfUser(req.query.id));
});

server.post('/orders', async (req, res) => {
  const order = addProductsToOrder(req.body);
  const orders = router.db.get('orders');
  orders.push(order).write();
  res.json(returnOrdersForDifrentTypeOfUser(order.userId));
});

server.put('/orders/:id', async (req, res) => {
  await router.db
    .get('orders')
    .find({ id: req.params.id })
    .assign({ status: req.body.status })
    .write();
  return res.json({ message: 'status change' });
});

server.post('/orderPositions', async (req, res) => {
  const id = shortid.generate();
  const orderPosition = Object.assign(req.body, { id });
  await router.db
    .get('orderPositions')
    .push(orderPosition)
    .write();
  const pos = router.db
    .get('orderPositions')
    .find({ id })
    .value();
  return res.json(pos);
});

server.put('/orderPositions/:id', (req, res, next) => {
  next();
});

server.put('/orderPositions/', async (req, res) => {
  const { orderPositionId, pcsOrder, totalPrice } = req.body;
  router.db
    .get('orderPositions')
    .find({ id: orderPositionId })
    .assign({ pcsOrder, totalPrice })
    .write();
  const response = router.db
    .get('orderPositions')
    .find({ id: orderPositionId })
    .value();
  res.json(response);
});

server.post('/product/:id', async (req, res) => {
  const { id } = req.params;
  router.db
    .get('products')
    .find({ id })
    .assign(req.body)
    .write();
  const product = router.db.get('products').find({ id });
  return res.json(product);
});

server.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { remove } = req.body;

  router.db
    .get('products')
    .find({ id })
    .assign({ remove })
    .write();
  const product = router.db
    .get('products')
    .find({ id })
    .value();
  return res.json(product);
});

server.post('/wishlists', (req, res) => {
  const {
    userId,
    product,
    product: { productId },
  } = req.body;
  const user = router.db
    .get('wishlists')
    .find({ userId })
    .value();
  if (user) {
    const productInWishlist = router.db
      .get('wishlists')
      .find({ userId })
      .get('products')
      .find({ productId })
      .value();

    if (productInWishlist) return res.json({ message: 'product in wishlist' });

    router.db
      .get('wishlists')
      .find({ userId })
      .get('products')
      .push(product)
      .write();
    return res.json(req.body);
  }

  router.db
    .get('wishlists')
    .push({
      products: [product],
      userId,
      id: shortid.generate(),
    })
    .write();
  return res.json(req.body);
});

server.delete('/wishlists', (req, res) => {
  const { userId, productId } = req.body;
  router.db
    .get('wishlists')
    .find({ userId })
    .get('products')
    .remove({ productId })
    .write();

  res.json(productId);
});

server.use(router);

server.listen(3004);
