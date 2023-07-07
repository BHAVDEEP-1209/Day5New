const express = require("express");
const app = express();
const cors = require("cors");
// const uploadController = require("./controllers/uploadController")
const authController = require("./controllers/authController");
const ProductController = require("./controllers/ProductController");
const mongoose = require("mongoose");

// database connection
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
const db = "mongodb+srv://bhavdeepkaushal392:root@cluster0.jwx3cxn.mongodb.net/test3"
mongoose.connect(db,connectionParams).then(()=>console.log("database connected!")).catch(err=>console.log("error while connecting  database!"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
// app.use("/image",uploadController);
app.use("/auth",authController);
app.use("/product",ProductController);


// listening
app.listen(8000,()=>console.log("server started!"));