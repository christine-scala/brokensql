//THIS FILE NEEDS TO BE FINISHED Y'ALL

var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();
var path= require("path");


app.get("/", (req,res)=> {
  res.sendFile(path.join(__dirname, "/index.html"));
})

app.post("/", [
  check("name")
      // Remove excess whitespace so we can see if we got only spaces
      .trim()
      // Name can't be just empty
      .notEmpty().withMessage("Name is required.")
      // If err, kick the user out to fix it
      .bail()
      // Matches letters spaces hyphens and apostrophes, including unicode characters for people with accents in their names, see https://regex101.com/r/ZKZkOC/4/ for examples
      .matches(/^[^-']([a-zA-ZÀ-ÖØ-öø-ÿ '-](?!.*''|--|  |- |' | '| -.*))+$/, 'g').withMessage("First name should start with a letter, and may only contain letters with spaces, hyphens, and apostrophes.")
      // If err, kick the user out to fix it
      .bail()
      // Match the length of the database column
      .isLength( { min:2, max:25 }).withMessage("Please enter a name between 2 and 25 characters."),
  check("username")
      .trim()
      .notEmpty().withMessage("Username is required.")
      .bail()
      .matches(/^[^-']([a-zA-ZÀ-ÖØ-öø-ÿ '-](?!.*''|--|  |- |' | '| -.*))+$/, 'g').withMessage("Last name should start with a letter, and may only contain letters with spaces, hyphens, and apostrophes.")
      .bail()
      .isLength( { min:2, max:15 }).withMessage("Please enter a username between 2 and 15 characters."),
  check("email")
      .trim()
      .notEmpty().withMessage("email is required.")
      .bail()
      .matches(/^[^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$))+$/, 'g').withMessage("Last name should start with a letter, and may only contain letters with spaces, hyphens, and apostrophes.")
      .bail()
      .isLength( { min:2, max:255 }).withMessage("Please enter a valid email."),
],
(req,res)=> {
  res.sendFile(path.join(__dirname, "/index.html"));
});

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'week11',
    password : ''
  });

  connection.connect();
 
// connection.query('select * from customers', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

connection.end();

module.exports = app;

app.listen(8080);