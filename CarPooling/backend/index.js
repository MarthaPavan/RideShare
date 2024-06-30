const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 1000;
const connection = require(`./connection/database.connection.js`);
const gettingStarted = require("./routes/getstarted");
const routes = require("./routes/routes");
const cors = require("cors");
const  rides = require("./routes/rides")
const mapapi = require("./routes/mapapi")

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//login and signup endpoints
app.use("/get-started", gettingStarted);
app.use("/rides",rides);
//other endpoints
app.use("/routes", routes);


app.use("/mapapi",mapapi)
app.get("/", (req, res) => {
  res.send("<h1>HomePage</h1>");
});



app.listen(port, () => console.log(`Server running on port ${port}`));
