const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./src/database/db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
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

function checkToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decoded) => decoded !== undefined);
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
  const response = await isAuth(req);
  if (response) {
    return res.send(response);
  }
  return res.status(401).json({ error: 'Email or password is incorrect!' });
});

server.use(router);

server.listen(3004);
