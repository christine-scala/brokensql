var express = require('express');
var mysql = require('mysql');
var app = express();
var path= require("path");

app.use(express.urlencoded({extended: true}));

app.get("/", (req,res)=> {
  res.sendFile(path.join(__dirname, "/index.html"));
})
 
app.post("/", (req,res)=> {
  console.log(req.body);

  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;

  //validate un bw 2-15 letters, capital or lowercase, or numbers
var regexUN = /([A-Za-z0-9]){2,15}/;
var regexName = /(^[^-']([a-zA-Z]){2,25}/;
var regexEmail = /([^[a-zA-Z_.0-9]+@[a-zA-Z_.0-9]+?\.[a-zA-Z]{2,3}$){2,255}/;

if(regexUN.test(username)){
  res.send(username);
} else {
  res.send('invalid username');
}
});


// if(regexName.test(name)){
//   res.send(name);
// } else {
//   res.send('invalid name');
// }


// if(regexEmail.test(email)){
//   res.send(email);
// } else {
//   res.send('invalid email');
// }

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