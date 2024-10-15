const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 1000;
const connection = require(`./connection/database.connection.js`);
const cors = require("cors");

// Importing Routes
const gettingStarted = require("./routes/getstarted");
const routes = require("./routes/routes");
const rides = require("./routes/rides");
const mapapi = require("./routes/mapapi");
const book = require("./routes/book.js");
const mailEmitter = require("./routes/mail.js");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/get-started", gettingStarted);
app.use("/rides", rides);
app.use("/routes", routes);
app.use("/book", book);
app.use("/mail", mailEmitter);
app.use("/mapapi", mapapi);

// Home Route
app.get("/", (req, res) => {
  res.send("<h1>HomePage</h1>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
