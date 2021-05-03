//mongodb connection using mongoose
const mongoose = require('mongoose');
//require config
const config = require('config');
//import string which is inside db.json 
const db = config.get('mongoURI');

//connecting to mongodb using mongoose (async/await)
const dbConnection = async () => {
    try{
        await mongoose.connect(db);
        console.log('Connected to MongoDB');
    } catch(err) {
        console.error(err.message);
        // exit the process if something goes wrong with failure
        process.exit(1);
    }
}
module.exports = dbConnection;
