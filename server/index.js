/*
Sari Ajina
Charles Cabugnason
Group 43
*/
const express = require('express'); 
const cors = require('cors'); 
const mysql = require('mysql'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv') ;

//creating a express.js application
const app = express(); 
app.use(express.json());
//enable cross domain requests
app.use(cors());
//additional middleware setup
//parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));
//parse JSON request bodies
app.use(bodyParser.json()); 

dotenv.config();

const JWT_SECRET="hasiduhfiuheoiuch1hh2h3dn738ycrb7832y81bc03";

//creating a MYSQL connection
const db = mysql.createConnection({ 
  host: 'localhost', 
  user: 'root', 
  password: 'password', 
  database: 'sp33d_db' 
});

//connecting to mysql db
db.connect((err) => { 
    if(err)
        console.log(err)
    console.log('MySQL connected!'); 
});

// Create a new user registration route
app.post('/register', async (req, res) => { 
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email
    const password = req.body.password;

    //hash the user's password 
    await bcrypt.hash(password, 10, (err, hash) => { 
        if (err){ 
            throw err;
        } 

        db.query(
            "INSERT INTO users(username, password, firstName, lastName, email) VALUES (?,?,?,?,?)", 
            [username, hash, firstName, lastName, email],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'An error occurred while registering the user!' });
                } else {
                    res.status(200).json({ message: 'User registered successfully!' });
                }
            }
        );
    });
});

// Create a new user registration route
app.post('/login', (req, res) => { 
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT username, password FROM users WHERE username = ?", 
        [username],
        async (err, result) => { 

            if(err){
                res.send({err: err})
            } 

            // if a user is found with the given username
            if(result.length > 0){ 
                // get the hashed password from the database
                const hashedPassword = result[0].password; 

                // Compare the user's password with the hashed password in the database using bcrypt
                const passwordMatch = await bcrypt.compare(password, hashedPassword); 

                if (passwordMatch) { 
                    if(typeof JWT_SECRET !== 'string' || JWT_SECRET.length === 0){
                        console.error('Invalid JWT secret!');
                        process.exit(1);
                    }
                    // Generate a JSON Web Token for the user's email address
                    const token = jwt.sign({ email: result[0].email }, JWT_SECRET); 
                    // Return the JSON Web Token to the client
                    res.json({ token, result: username }); 
                } else { 
                    // res.status(401).json({ message: 'Incorrect password!' }); 
                    res.send({message: "Incorrect Password!"})
                }
            } else { 
                // res.status(401).json({ message: 'Incorrect username or password!' });
                res.send({ message: 'Incorrect username or password!' });
            }
        }
    );
});

app.post('/homepage', (req, res) => {
    const tableName = req.body.tableName;
    console.log("this is tableName ", tableName)

    db.query
    (`CREATE TABLE ${tableName} (id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY);`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'An error occurred while creating a table' });
            } else {
                res.status(200).json({ message: 'Table Created Successfully!' });
            }
        }
    )
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
  