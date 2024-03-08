import dotenv from 'dotenv'
dotenv.config({path:''})
import app from './app/app.js';
import connectDB from './connect.js';

try{
  connectDB(process.env.MONGO_URI);
}catch{
  console.log('Database connection failed!')
  process.exit(1)
}

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
  console.log(`Server is running on ${port}`);
})


  // const shortId = req.params.shortId;
  // const entry = await URL.findOneAndUpdate(
  //   {
  //     shortId,
  //   },
  //   {
  //     $push: {
  //       visitHistory: {
  //         timestamp: Date.now(),
  //       },
  //     },
  //   }
  // );
  // if (entry) res.redirect(entry.redirectURL);

