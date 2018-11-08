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
  const {
    id, firstName, lastName, role, companyId,
  } = user;
  if (!user) {
    return false;
  }
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

function addProductsToOrder(orders) {
  orders.forEach((order) => {
    Object.assign(order, { productsOrder: [] });
    order.orderPositionIds.forEach((position) => {
      const pos = router.db
        .get('orderPositions')
        .find({ id: position })
        .value();
      order.productsOrder.push(pos);
    });
  });
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
  const user = findUserById(req.query.id);
  if (user.role === 'admin') {
    const orders = router.db.get('orders').value();
    addProductsToOrder(orders);
    return res.json(orders);
  }

  const orders = router.db
    .get('orders')
    .filter({ companyId: user.companyId })
    .value();
  addProductsToOrder(orders);
  return res.json(orders);
});

server.post('/orders', async (req, res, next) => {
  const order = addProductsToOrder([req.body]);
  [req.body] = order;
  next();
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
server.put('/orderPositions/:id', async (req, res, next) => {
  next();
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
server.post('/whislists', (req, res) => {
  console.log(req.body);
  const { userId, product } = req.body;
  const user = router.db.get('whislists').find({ userId });
  if (user) {
    router.db
      .get('whislists')
      .find({ userId })
      .get('products')
      .push(product)
      .write();
    return res.json(req.body);
  }
});

server.delete('/whislists', (req, res) => {
  const { userId, productId } = req.body;
  router.db
    .get('whislists')
    .find({ userId })
    .get('products')
    .remove({ productId })
    .write();

  res.json(productId);
});

server.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  router.db
    .get('products')
    .find({ id })
    .assign({ remove: true })
    .write();
  const product = router.db
    .get('products')
    .find({ id })
    .value();
  return res.json(product);
});

server.use(router);

server.listen(3004);
