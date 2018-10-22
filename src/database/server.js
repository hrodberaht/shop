const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./src/database/db.json');
const middlewares = jsonServer.defaults();

async function isAuth(req) {
  const { email, password } = req.body;
  const user = await router.db
    .get('users')
    .find({ email })
    .value();
  if (!user) {
    return false;
  }
  if (email === user.email && password === user.password) {
    return true;
  }

  return false;
}
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(async (req, res) => {
  const auth = await isAuth(req);
  if (auth) return res.send({ message: 'auth' });
  return res.status(401).json({ error: 'Email or password is incorrect!' });
});

server.use(router);

server.listen(3004);
