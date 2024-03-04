const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connectDB = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to DB!!");
};

module.exports = connectDB;
