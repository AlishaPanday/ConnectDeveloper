//import express
const express = require('express');
const dbConnection = require('./config/db');

//initialise app variable with express
const app = express();

//connecting  database
dbConnection();

app.get('/',(req,res) => res.send('API Server Running'));
//process.env will look for an evironment variable called PORT when deployed in HEROKU
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));