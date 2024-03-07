import mongoose from 'mongoose'
mongoose.set('strictQuery', false);

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!!");
  } catch (error) {
    console.error('Database connection failed!', error);
    process.exit(1);
  }
};


export default connectDB;
