const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const seedMovement = require("./routes/seedMovement.route");

const port = process.env.PORT || 5000; // Changed port

app.use(cors({
  origin: 'http://localhost:9000'
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/seedMovement", seedMovement);

app.get("/", (req, res) => {
  res.send(
    `<h1 style="background-color:DodgerBlue;color:white;text-align:center;">OECD api is Running..</h1>`
  );
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
