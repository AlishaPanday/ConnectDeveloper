//import express
const express = require('express');
const dbConnection = require('./config/db');
const path = require('path');

//initialise app variable with express
const app = express();

//connecting  database
dbConnection();

//middleware initialisation
app.use(express.json({extended:true}));


//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

//process.env will look for an evironment variable called PORT when deployed in HEROKU
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));