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

app.get('/filter', (req, res) => {
    const filteredOption = req.query.filteredOption;
    console.log(filteredOption)

    if(filteredOption) {
    
        let query = '';
        const category1 = req.query.category1;
        const category2 = req.query.category2;
        const userX = req.query.userX;

        switch (filteredOption) {
          case 'option1':
            console.log("option1 was selected and submitted")
            query = `SELECT * FROM items i1 WHERE price = (
                    SELECT MAX(price) FROM items i2 WHERE i2.category = i1.category
                    )`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 1", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option2':
            console.log("option2 was selected and submitted")
            query = `SELECT DISTINCT u.username 
                    FROM users u
                    JOIN items i1 ON u.username = i1.user_id
                    JOIN items i2 ON u.username = i2.user_id AND LEFT(i1.created_at, 9) = LEFT(i2.created_at, 9)
                    WHERE i1.category = '${category1}' AND i2.category = '${category2}'`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 2", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option3':
            console.log("option3 was selected and submitted")
            query = `SELECT i.id, i.user_id, i.category, i.price, u.username, COUNT(*) as num_reviews
                    FROM items i JOIN users u ON i.user_id = u.username
                    JOIN reviews r ON i.id = r.item_id
                    WHERE u.username = '${userX}' AND r.rating IN ('Excellent', 'Good')
                    GROUP BY i.id
                    HAVING COUNT(*) = SUM(r.rating = 'Excellent' OR r.rating = 'Good')`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 3", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option4':
            console.log("option4 was selected and submitted")
            query = `SELECT username, COUNT(*) AS num_items
                    FROM users JOIN items ON username = items.user_id
                    WHERE created_at >= '2020-05-01'
                    GROUP BY username
                    ORDER BY num_items DESC
                    LIMIT 1`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 4", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option5':
            console.log("option5 was selected and submitted")
            query = `SELECT DISTINCT u.username FROM users u
                    JOIN favorites f1 ON u.id = f1.user_id AND f1.favorite_id IN (
                      SELECT favorite_id FROM favorites WHERE user_id = 'userX'
                    )
                    JOIN favorites f2 ON u.id = f2.user_id AND f2.favorite_id IN (
                      SELECT favorite_id FROM favorites WHERE user_id = 'userY'
                    )
                    WHERE u.id NOT IN ('userX', 'userY')`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 5", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option6':
            console.log("option6 was selected and submitted")
            query = `SELECT DISTINCT u.username FROM users u
            JOIN items i ON u.username = i.user_id
            JOIN reviews r ON i.id = r.item_id AND r.rating = 'Excellent'
            GROUP BY u.username
            HAVING COUNT(*) < 3;`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 6", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option7':
            console.log("option7 was selected and submitted")
            query = `SELECT DISTINCT reviewer_username
                    FROM reviews
                    WHERE reviewer_username NOT IN (
                    SELECT reviewer_username
                    FROM reviews
                    WHERE rating = 'Poor'
                    )`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 7", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option8':
            console.log("option8 was selected and submitted")
            query = `SELECT reviewer_username
                    FROM reviews
                    GROUP BY reviewer_username
                    HAVING COUNT(*) = SUM(rating = 'Poor')`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 8", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option9':
            console.log("option9 was selected and submitted")
            query = `SELECT user_id, title
                    FROM items i
                    WHERE NOT EXISTS (
                    SELECT *
                    FROM reviews r
                    WHERE r.item_id = i.id
                    AND r.rating = 'Poor'
                    )`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 9", data: results});
                    // console.log(results)
                }
            } )
            break;
          case 'option10':
            console.log("option10 was selected and submitted")
            query = `SELECT DISTINCT r1.reviewer_username AS user_A, r2.reviewer_username AS user_B
                    FROM reviews r1
                    JOIN reviews r2
                    JOIN items i2 ON r1.item_id = i2.id
                    JOIN items i1 ON r2.item_id = i1.id
                    WHERE r1.reviewer_username < r2.reviewer_username
                    AND r1.rating = 'excellent' AND r2.rating = 'excellent'
                    AND NOT EXISTS (
                    SELECT *
                    FROM reviews r3
                    WHERE r3.item_id = r1.item_id
                    AND r3.reviewer_username IN (r1.reviewer_username, r2.reviewer_username)
                    AND r3.rating != 'excellent'
                    )`;

            db.query(query, (error, results) => {
                if (error) {
                    console.error(error);
                    // res.status(500).send('Server error');
                } else {
                    res.send({message: "Filtered Option 10", data: results});
                    // console.log(results)
                }
            } )
            break;
          default:
            break;
        }
    }
})

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
  