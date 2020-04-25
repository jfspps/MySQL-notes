console.log("MySQL notes");

var faker = require('faker');
var mysql = require('mysql');
     
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '********',
  database : 'fakeData'
});

var q = "SELECT CURDATE() AS 'CurrentDate', CURTIME() AS 'CurrentTime'";

connection.query(q, function(error, results, fields){
    if (error) throw error;
    console.log("Connected!");
    console.log("Today's date is ", results[0].CurrentDate);
    console.log("The time is ", results[0].CurrentTime)
});

connection.query("DROP TABLE users", function(error, results, fields){
    if (error){
        throw error;
        console.log('Could not drop table, users');
    }
    console.log(results);
});

connection.query("CREATE TABLE users(email VARCHAR(255) PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW())", function(error, results, fields){
    if (error){
        throw error;
        console.log('Could not list all users data');
    }
    console.log('Table created');
});

connection.query("DESCRIBE users", function(error, results, fields){
    if (error){
        throw error;
        console.log('Could not list all users data');
    }
    console.log(results);
});

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

connection.query("SELECT COUNT(*) AS 'Number of users' FROM users", function(error, results, fields){
    if (error){
        throw error;
        console.log('Could not select data');
    }
    console.log(results);
});

connection.end();