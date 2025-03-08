require('dotenv').config();

const mongoose = require('mongoose');

const USER_NAME = process.env.USERNAME;
const PASS = process.env.PASSWORD;

// const mongoURI = "mongodb://localhost:27017/ibook";

const mongoURI = `mongodb+srv://user:${PASS}@ibook.dwg85.mongodb.net/?retryWrites=true&w=majority&appName=ibook`

// const { mongoURI } = require('./config');

const connectToMongo = async () => {
    await mongoose.connect(mongoURI, {
    });
    console.log("Connected to MongoDB successfully..");
}
module.exports = connectToMongo;







