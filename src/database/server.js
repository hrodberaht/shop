const yup = require('yup');
const jsonServer = require('json-server');

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

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function checkToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decoded) => decoded !== undefined);
}

async function isAuth(req) {
  const { email, password } = req.body;
  const user = await router.db
    .get('users')
    .find({ email })
    .value();
  if (!user) {
    return false;
  }
  if (password === user.password) {
    const accessToken = createToken({ email, password });
    const response = {
      token: accessToken,
      message: 'auth',
    };
    return response;
  }

  return false;
}

function addUserToDb(req) {
  const messages = {};
  return schema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      const user = router.db
        .get('users')
        .push(Object.assign(req.body, { role: 'user' }))
        .write();

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
    .find({ email: req.body.email })
    .value();

  if (user) return { error: 'Email is taken' };

  return false;
}

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (checkToken(token)) {
      return next();
    }
  }

  if (req.originalUrl === '/registration') {
    const check = await checkIfEmailIsTaken(req);
    if (check.error) return res.status(422).json({ error: check.error });
    const register = await addUserToDb(req);
    if (register.message) return res.send({ message: register.message });
    return res.status(422).json({ errors: register.errors.errors });
  }

  const response = await isAuth(req);
  if (response) {
    return res.send(response);
  }
  return res.status(401).json({ error: 'Email or password is incorrect!' });
});

server.use(router);

server.listen(3004);
