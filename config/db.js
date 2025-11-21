const mongoose = require('mongoose');  // imports mongoose library

//we use async for promise handeling because mongoose.connect() this returns a promise 

//why it returns 
//Because connecting to MongoDB is an asynchronous operation (network call). Promise helps your code wait until the connection is established.
//thats why we use await operation here to handle asynchronous operation
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
