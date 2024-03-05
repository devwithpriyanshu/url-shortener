const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToMongoDB = require("./connect");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const app = express();
const port = process.env.PORT || 8001;
const urlRoute = require("./routes/url");
const URL = require("./models/url");

app.use(
  cors({
    origin:
      "https://zipli.vercel.app"
  })
);
app.use(jsonParser);
app.use(express.json());

const start = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await connectToMongoDB(uri);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

/* routes */

app.get("/", (req, res) => {
  return res.send("Hello World");
});
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry) res.redirect(entry.redirectURL);
});
