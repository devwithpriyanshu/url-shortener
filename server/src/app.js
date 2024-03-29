import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", (req, res, next) => {
  res.send("url shortener server");
});

app.get("/api", (req, res) => {
  res.send("<h1>URL Shortener API home route</h1>");
});
app.use("/api/url", urlRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(422).send({ error: err.message || "An error occurred." });
});

export default app;
