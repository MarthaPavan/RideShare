const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 1000;
const connection = require(`./connection/database.connection.js`);
const gettingStarted = require("./routes/getstarted");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/get-started",gettingStarted);

app.get("/",(req,res)=>{
    res.send("<h1>HomePage</h1>");
})
app.listen(port,()=>console.log(`Server running on port ${port}`));