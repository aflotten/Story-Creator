// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  keys: ["secretkey"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
<<<<<<< HEAD
// const userApiRoutes = require('./routes/users-api');
// const widgetApiRoutes = require('./routes/widgets-api');
// const usersRoutes = require('./routes/users');
   const loginRoutes = require("./routes/login-route");

// // Mount all resource routes
// // Note: Feel free to replace the example routes below with your own
// // Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/users', userApiRoutes);
// app.use('/api/widgets', widgetApiRoutes);
// app.use('/users', usersRoutes);
   app.use('/login', loginRoutes)
=======
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login-route');
const registerRoutes = require('./routes/register-route');
const indexRoutes = require('./routes/index');
// // Mount all resource routes
// // Note: Feel free to replace the example routes below with your own
// // Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', indexRoutes);
>>>>>>> 2ccf18250a77dffe5165e1e1a9625ea231c2e35d
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

<<<<<<< HEAD
app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/login', (req, res) => {
//   res.render('login');
// });

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  res.render('index')
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  res.render('index')
});

=======
>>>>>>> 2ccf18250a77dffe5165e1e1a9625ea231c2e35d
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
