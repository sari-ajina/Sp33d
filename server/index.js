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
    // const tableName = req.body.tableName;
    // console.log("this is tableName ", tableName)

    // db.query
    // (`CREATE TABLE ${tableName} (id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY);`,
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.status(500).json({ error: 'An error occurred while creating a table' });
    //         } else {
    //             res.status(200).json({ message: 'Table Created Successfully!' });
    //         }
    //     }
    // )

    const category = req.body.category
    db.query(`SELECT title, description, category, price, created_at, user_id FROM items WHERE category= '${category}'`,
        (err, results) => {
            if(err) throw err;

            res.send({message: "Searched"})
        }
    )
});

app.get('/homepage', (req, res) => {
    const category = req.query.category
    // console.log("category: ", category)
    db.query(`SELECT title, description, category, price, created_at, user_id FROM items WHERE category= '${category}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Server error');
        } else {
            res.send({message: "Searched"});
            // console.log(results)
        }
    });
});

//search page
app.get('/searchedItem', (req, res) => {
    const category = req.query.category
    // console.log("category: ", category)
    db.query(`SELECT title, description, category, price, created_at, user_id FROM items WHERE category= '${category}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Server error');
        } else {
            res.send({message: "Searched", data: results});
            // console.log(results)
        }
    });
});

//route for obtaining data for the itemPage
app.get('/itemPage', (req, res) => {
    const title = req.query.title
    // console.log("title: ", title)
    db.query(`SELECT id, title, description, category, price, created_at, user_id FROM items WHERE title= '${title}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Server error');
        } else {
            res.send({message: "Searched", data: results});
            // console.log(results)
        }
    });
});

// Handle POST request to add a review from itemPage
app.post('/itemPage', (req, res) => {
    const itemId = req.body.item_id;
    const reviewerUsername = req.body.reviewer_username;
    const rating = req.body.rating;
    const description = req.body.description;
  
    // Check if the reviewer has already submitted 3 reviews today
    const today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }).slice(0.10);
    const formattedDate = new Date(today).toISOString().slice(0, 10);
  
    db.query(
      'SELECT COUNT(*) as count FROM reviews WHERE reviewer_username = ? AND DATE(created_at) = ? ',
      [reviewerUsername, formattedDate],
      (err, result) => {
        console.log("first query results:", reviewerUsername + " " + formattedDate )
        if (err) {
          console.error(err);
          return res.send({message: "Failed to count reviews"});
        }
  
        const count = result[0].count;
  
        if (count >= 3) {
          return res.send({ message: 'You have already submitted 3 reviews today.' });
        }
  
        // Check if the reviewer is the item owner
        // item_id is a foreign key in the reviews table connected to the id of the item in the items table
        //checking if the two match
        db.query(
          'SELECT id FROM items WHERE id = ?',
          [itemId],
          (err, result) => {
            // console.log("item Id that's going to sql", itemId)
            if (err) {
              console.error(err);
              return res.send({ message: 'Failed to check item id.' });
            }
    
            db.query(
              'SELECT COUNT(*) as count FROM items WHERE user_id = ? AND id = ?',
              [reviewerUsername, itemId],
              (err, result) => {
                if (err) {
                  console.error(err);
                  return res.send({ message: 'Failed to count item owner.' });
                }
  
                const count = result[0].count;
  
                if (count > 0) {
                  return res.send({ message: 'You cannot review your own item.' });
                }
  
                // Insert the review into the Review table
                db.query(
                  'INSERT INTO reviews (item_id, reviewer_username, rating, description) VALUES (?, ?, ?, ?)',
                  [itemId, reviewerUsername, rating, description],
                  (err, result) => {
                    if (err) {
                      console.error(err);
                      return res.send({ message: 'Failed to add review.' });
                    }
  
                    return res.send({ message: 'Review added successfully.' });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
  

// Route for creating a new item
app.post('/items', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price;
    const userId = req.body.userId;

    // console.log('userId:', userId);
    
    // Check if the user has already posted 3 items today
    const today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }).slice(0.10);
    const formattedDate = new Date(today).toISOString().slice(0, 10);

    db.query(`SELECT COUNT(*) AS count FROM items WHERE user_id = ? AND DATE(created_at) = ?`, [userId, formattedDate],
    (err, results) => {
        if (err) throw err;
        // console.log("date: ", formattedDate)
        // console.log("results: ", results[0].count)
        if (results[0].count >= 3) {
            console.log("count is maxed for user today")
            return res.send({message: 'you have already posted 3 items today'});
        }

        // Insert the new item into the database
        const newItem = {
            title,
            description,
            category,
            price,
            user_id: userId,
        };
        
        db.query('INSERT INTO items SET ?', newItem, (err, results) => {
            if (err) throw err;

            res.send(`Item ${results.insertId} created`);
        });
    });
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
  