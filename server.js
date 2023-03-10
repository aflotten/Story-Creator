// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json({}));

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

// // Mount all resource routes
// // Note: Feel free to replace the example routes below with your own
// // Note: Endpoints that return data (eg. JSON) usually start with `/api`

const loginRoutes = require('./routes/login-route');
const registerRoutes = require('./routes/register-route');
const homeRoutes = require('./routes/home-route');
const additionsRoutes = require('./routes/additions-route');
const creationRoutes = require('./routes/creation-route')
const logoutRoutes = require('./routes/logout-route');
const apiRoutes = require('./routes/api-routes');
const myStoriesRoutes =require('./routes/mystories-route');
const completedRoute = require('./routes/completed-route');
// // Mount all resource routes
// // Note: Feel free to replace the example routes below with your own
// // Note: Endpoints that return data (eg. JSON) usually start with `/api`

// Note: mount other resources here, using the same pattern above

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', homeRoutes);
app.use('/additions', additionsRoutes);
app.use('/creation', creationRoutes);
app.use('/logout', logoutRoutes);
app.use('/api', apiRoutes);
app.use('/mystories',myStoriesRoutes);
app.use('/completed',completedRoute);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
