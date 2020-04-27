var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var bodyparser = require('body-parser');

var app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//establish connections and routing (remember to ALTER USER 'course'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass&_202LINQ' and 'flush privileges' if needed)

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'course',
    password : 'pass&_202LINQ',
    database : 'fakeData'
});

//MySQL workbench does not appear to permit new user creation, so via the CLI, use
// CREATE USER 'course' IDENTIFIED BY 'pass&_202LINQ';
// GRANT SELECT, INSERT, UPDATE, DELETE ON fakeData.* TO 'course'@'localhost' WITH GRANT OPTION

app.get("/", function(req, res){
    res.send("Connection established...");
});

app.get("/users", function(req, res){
    var queryString = "SELECT count(*) AS count FROM users";
    var errorString = "Could not find users on the database";

    connection.query(queryString, function(error, results){
        if (error){
            console.log(errorString);
            throw error;
        };
        //use count from the SQL statement AS count:
        // res.send("There are " + results[0].count + " users on the database");
        res.render("users", {data: results[0].count});
    }); 
});

app.post("/register", function(req, res){
    // console.log("New record received..." + req.body.email);
    var newUser = {email: req.body.email};
    var queryString = "INSERT INTO users SET ?";
    var errorString = "Could not insert new user details";
    
    connection.query(queryString, newUser, function(error, results){
        if (error){
            console.log(errorString);
            throw error;
        };
        console.log("User added");
        res.redirect("/users");
    }); 
});

app.listen(8080, function(){
    console.log("Listening to port 8080");
});