console.log("MySQL notes");

var faker = require('faker');
var mysql = require('mysql');
     
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '***********',
  database : 'fakeData'
});

function mySQLquery(queryString, errorString){
    connection.query(queryString, function(error, results, fields){
        if (error){
            throw error;
            console.log(errorString);
        }
        console.log(results);
    });
};

var q = "SELECT CURDATE() AS 'CurrentDate', CURTIME() AS 'CurrentTime'";

connection.query(q, function(error, results, fields){
    if (error) throw error;
    console.log("Connected!");
    console.log("Today's date is ", results[0].CurrentDate);
    console.log("The time is ", results[0].CurrentTime)
});

mySQLquery("DROP TABLE users", "Could not drop table, users");

mySQLquery("CREATE TABLE users(email VARCHAR(255) PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW())", "Table creation failed");

mySQLquery("DESCRIBE users", "Could not list table properties");

// connection.query("INSERT INTO users(email) VALUES('jim@jom.com')", function(error, results, fields){
//     if (error){
//         throw error;
//         console.log('Could not insert data');
//     }
//     console.log('Success, user added');
//     console.log(results);
// });

// var randomDude = {email: faker.internet.email()};

// connection.query("INSERT INTO users SET ?", randomDude, function(error, results, fields){
//     if (error){
//         throw error;
//         console.log('Could not insert data');
//     }
//     console.log('Success, random Dude added');
//     console.log(results);
// });

var data = [];

//more efficient to loop in Javascript than run SQL queries 500 times
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ])
}

var q2 = "INSERT INTO users (email, created_at) VALUES ?";

connection.query(q2, [data], function(error, results, fields){
    if (error){
        throw error;
        console.log('Could not insert data');
    }
    console.log('Success, 500 users added');
    console.log(results);
});

mySQLquery("SELECT COUNT(*) AS 'Number of users' FROM users", "Could not select data");

// a few example queries

mySQLquery("select DATE_FORMAT(created_at, '%b %D %Y') AS earliest_date FROM users ORDER BY created_at ASC LIMIT 1", "Could not find the earliest date");
mySQLquery("select DATE_FORMAT(created_at, '%b %D %Y') AS latest_date FROM users ORDER BY created_at DESC LIMIT 1", "Could not find the latest date");

mySQLquery("SELECT email, created_at from users order by created_at ASC LIMIT 1", "Could not find email of earliest user");

mySQLquery("select MONTHNAME(created_at) AS month, count(*) AS count from users group by MONTHNAME(created_at) ORDER BY COUNT(*) DESC", "Could not list user registrations by month");

mySQLquery("select count(*) AS yahoo_users from users WHERE email LIKE '%yahoo.com'", "Could not list number of users with Yahoo email accounts");

mySQLquery("select case when email LIKE '%gmail.com' THEN 'gmail' when email LIKE '%yahoo.com' then 'yahoo' when email LIKE '%hotmail.com' then 'hotmail' else 'other' end as 'provider', count(*) FROM users group by provider", 
"Could not list number of emails by provider");

connection.end();