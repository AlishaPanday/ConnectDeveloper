const express = require('express');
//initialise app variable with express
const app = express();

app.get('/',(req,res) => res.send('API Server Running'));
//process.env will look for an evironment variable called PORT when deployed in HEROKU
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));