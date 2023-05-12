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
                    if (typeof localStorage !== 'undefined') {
                        // localStorage is supported, proceed with your code
                        localStorage.setItem({token, result: username});
                    } else {
                        console.log("error not supported")
                    // localStorage is not supported, find an alternative way to store your data
                    }
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
    const category = req.body.category
    db.query(`SELECT title, description, category, price, created_at, user_id 
    FROM items WHERE category= '${category}'`,
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

// app.post('/profile', (req, res) => {
//     const user = req.body.username;
//     const profileUser = req.body.profileUser;

//     console.log("user:", user)
//     console.log("profile:", profileUser)

//     if (user == profileUser) {
//         return res.send({ message: 'you cannot follow yourself' }); // Return the response and exit the function
//     }

//     db.query(`INSERT INTO favorites (user_id, favorite_user_id, favorite)
//         VALUES (?, ?, true)
//         ON DUPLICATE KEY UPDATE favorite = NOT favorite;`, [user, profileUser],
//         async (err, results) => {
//             if (err) {
//                 return res.send({ err: err }); // Return the error response and exit the function
//             }

//             return res.send({ message: 'user favorited' }); // Return the success response and exit the function
//         })
// })

app.post('/profile', (req, res) => {
    const user = req.body.username;
    const profileUser = req.body.profileUser;

    console.log("user:", user)
    console.log("profile:", profileUser)

    if (user == profileUser) {
        return res.send({ message: 'you cannot follow yourself' }); // Return the response and exit the function
    }

    db.query(`
        SELECT favorite FROM favorites WHERE user_id = ? AND favorite_user_id = ?`, [user, profileUser], (err, results) => {
        if (err) {
        return res.send({ err: err }); // Return the error response and exit the function
        }

        const favorite = results.length > 0 ? results[0].favorite : false;
        const toggleFavorite = !favorite;

        db.query(`
        INSERT INTO favorites (user_id, favorite_user_id, favorite)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE favorite = ?
        `, [user, profileUser, toggleFavorite, toggleFavorite], (err, results) => {
        if (err) {
            return res.send({ err: err }); // Return the error response and exit the function
        }

        const message = toggleFavorite ? 'user favorited' : 'user unfavorited';
        return res.send({ message: message }); // Return the success response and exit the function
        });
    });
});

app.get('/profile', (req,res)=>{
    const profile = req.query.profile;
    // console.log(username)
    db.query(`SELECT * FROM items WHERE user_id= '${profile}' `, (err, results) => {
        if(err) console.log(err)

        res.send({data: results})
    })
})
  

app.get('/filter', (req, res) => {
    const filteredOption = req.query.filteredOption;
    console.log(filteredOption)

    if(filteredOption) {
    
        let query = '';
        const category1 = req.query.category1;
        const category2 = req.query.category2;
        const option3 = req.query.option3;
        const userX = req.query.userX;
        const userY = req.query.userY;

        switch (filteredOption) {
          case 'option1':
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
            query = `SELECT DISTINCT u.username 
                    FROM users u
                    JOIN items i1 ON u.username = i1.user_id
                    JOIN items i2 ON u.username = i2.user_id AND LEFT(i1.created_at, 9) = LEFT(i2.created_at, 9)
                    WHERE i1.category = '${category1}' AND i2.category = '${category2}'`;


            console.log(category1);
            console.log(category2);        
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
            query = `SELECT i.id, i.user_id, i.description, i.title, i.category, i.price, i.created_at, u.username, COUNT(*) as num_reviews
                    FROM items i JOIN users u ON i.user_id = u.username
                    JOIN reviews r ON i.id = r.item_id
                    WHERE u.username = '${option3}' AND r.rating IN ('Excellent', 'Good')
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
            query = `SELECT f1.favorite_user_id
            FROM favorites f1
            INNER JOIN favorites f2 ON f1.favorite_user_id = f2.favorite_user_id
            WHERE f1.user_id = '${userX}' AND f2.user_id = '${userY}' AND f1.favorite = true AND f2.favorite = true;`;

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

app.get('/users', (req, res)=>{
    db.query(`SELECT username FROM users`, (err, results) => {
        if(err) console.log(err)

        res.send({data: results})
    })
})

app.get('/userprofile', (req,res)=>{
    const username = req.query.username;
    // console.log(username)
    db.query(`SELECT * FROM items WHERE user_id= '${username}' `, (err, results) => {
        if(err) console.log(err)

        res.send({data: results})
    })
})

app.get('/randomItem', (req,res)=>{
    db.query(`SELECT * FROM items ORDER BY RAND() LIMIT 6 `, (err, results) => {
        if(err) console.log(err)

        res.send({data: results})
    })
})

//search page
app.get('/searchedItem', (req, res) => {
    const category = req.query.category
    // console.log("category: ", category)
    db.query(`SELECT id, title, description, category, price, created_at, user_id FROM items WHERE category= '${category}'`, (error, results) => {
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
    // const title = req.query.title
    const item_id = req.query.item_id
    // console.log("title: ", title)
    db.query(`SELECT id, title, description, category, price, created_at, user_id FROM items WHERE id= '${item_id}'`, (error, results) => {
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
  