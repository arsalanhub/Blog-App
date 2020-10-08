<h1>Blog-App</h1>
Simple blog app made using
<div>Front-end technologies : html, css, semantic-ui</div> 
<div>Back-end technologies  : nodejs, expressjs</div>
<div>Database               : mongoDB</div>

This blog app follow RESTful routing concept
for CRUD(Create, Read, Update and Delete)

Setup required to run the project :

Download GitBash (optional), MongoDB, nodejs

Packages Required :

### `npm install body-parser`

Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, 
available under the req.body property.

Note As req.body's shape is based on user-controlled input, all properties and values in this object are untrusted and 
should be validated before trusting. For example, req.body.foo.toString() may fail in multiple ways, for example the foo 
property may not be there or may not be a string, and toString may not be a function and instead a string or other user input.

### `npm install ejs`

EJS or Embedded Javascript Templating is a templating engine used by Node.js. Template engine helps to create an HTML template 
with minimal code. Also, it can inject data into HTML template at the client side and produce the final HTML.

### `npm install express`

Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and 
mobile applications. It facilitates the rapid development of Node based Web applications.

### `npm install --save express-sanitizer`

An express middleware for Caja-HTML-Sanitizer, which wraps Google Caja sanitizer. A useful complement to the express-validator -- to 
fill a gap now that XSS sanitization support has been removed from that module's parent node-validator.

### `npm install method-override`

Method overriding, in object-oriented programming, is a language feature that allows a subclass or child class to provide a 
specific implementation of a method that is already provided by one of its superclasses or parent classes. 

### `npm install mongoose`

Mongoose is an Object Data Modeling (ODM) library that is used for schema validations and managing relationships among data. 
Mongoose is frequently used with NodeJS and MongoDB. 

Run the project from command line

### `node app.js`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
