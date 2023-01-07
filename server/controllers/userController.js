const mysql = require('mysql');
const router = require('../routes/user');


// Connection Pool
const pool = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME        
});

// View Users
exports.view = (reque, res) =>{
  pool.getConnection((err, connection) =>{
    if(err) throw err; // not connected;
    console.log('Connected ass ID ' + connection.threadId);

    // use the connection
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
      // when done with the connection, release it
      connection.release();

      if(!err){
        res.render('home', { rows });
      } else {
        console.log(err)
      }

      console.log('The data from user table \n', rows)

    });
  })
}

// Fing user by search
exports.find = (reque, res) =>{
  pool.getConnection((err, connection) =>{
    if(err) throw err; // not connected;
    console.log('Connected ass ID ' + connection.threadId);

    let searchTerm = req.body.search;

    // use the connection
    connection.query('SELECT * FROM user WHERE first_nime LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      // when done with the connection, release it
      connection.release();

      if(!err){
        res.render('home', { rows });
      } else {
        console.log(err)
      }

      console.log('The data from user table \n', rows)

    });
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  pool.getConnection((err, connection) =>{
    if(err) throw err; // not connected;
    console.log('Connected ass ID ' + connection.threadId);

    let searchTerm = req.body.search;

    // use the connection
    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
      // when done with the connection, release it
      connection.release();

      if(!err){
        res.render('add-user', { alert: 'user added succesfully.' });
      } else {
        console.log(err)
      }

      console.log('The data from user table \n', rows)

    });


  });
}

exports.edit = (req, res) => {
  pool.getConnection((err, connection) =>{
    if(err) throw err; // not connected;
    console.log('Connected ass ID ' + connection.threadId);

    // use the connection
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
      // when done with the connection, release it
      connection.release();

      if(!err){
        res.render('edit-user', { rows });
      } else {
        console.log(err)
      }

      console.log('The data from user table \n', rows)

    });
  })
}
