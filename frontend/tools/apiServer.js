/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const fs = require('fs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456789';
const expiresIn = '1h';

const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const userdb = JSON.parse(fs.readFileSync(path.join(__dirname,'./users.json'), 'UTF-8'));


// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function(req, res, next) {
  setTimeout(next, 2000);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});


// articles instead of courses
server.post("/articles/", function(req, res, next) {
  const error = validateArticle(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.title); // Generate a slug for new courses.
    next();
  }
});

// articles instead of courses
server.post("/contactform/", function(req, res, next) {
  const error = validateContactForm(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    // req.body.slug = createSlug(req.body.title); // Generate a slug for new courses.
    const contactFormResponse = { saved: true };
    res.status(200).send(contactFormResponse);
  }
});


// SIGN IN - Data-Beta
server.post('/auth/signin', (req, res) => {
  const {email, password} = req.body
  if (isAuthenticated({email, password}) === -1) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  res.status(200).json({access_token})
})

// server.use(/^(?!\/auth).*$/,  (req, res, next) => {
//   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//     const status = 401
//     const message = 'Bad authorization header'
//     res.status(status).json({status, message})
//     return
//   }
//   try {
//      verifyToken(req.headers.authorization.split(' ')[1])
//      next()
//   } catch (err) {
//     const status = 401
//     const message = 'Error: access_token is not valid'
//     res.status(status).json({status, message})
//   }
// })


// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

// Data-Beta Adjusted
function validateArticle(article) {
  if (!article.title) return "Title is required.";
  if (!article.authorId) return "Author is required.";
  if (!article.category) return "Category is required.";
  return "";
}

function validateContactForm(contactForm) {
  if (!contactForm.firstName) return "First Name is required.";
  if (!contactForm.lastName) return "Last Name is required.";
  if (!contactForm.email) return "Email is required.";
  if (!contactForm.phone) return "Phone is required.";
  if (!contactForm.comment) return "Comment is required.";
  return "";
}

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

function isAuthenticated({email, password}) {
  console.log(userdb.users)
  return userdb.users.findIndex(user => user.email === email && user.password === password)
}
