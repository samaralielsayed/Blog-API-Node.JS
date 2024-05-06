//express methods
const express = require("express");
const exp = express();
const cors = require('cors');
const ImageKit = require("imagekit");

//env
require("dotenv").config();

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  authenticationEndpoint: `http://localhost:${process.env.PORT}/auth` // Your server's authentication endpoint
});

//Converting from json to Object
exp.use(express.json());

exp.use(cors());
//Database

require("./db/dbConnection");


//routes all methods from routing file
const userRouter=require('./routes/users.route');
const postRouter=require('./routes/posts.route');




// Middleware for CORS and JSON parsing
exp.use(cors());
exp.use(express.json());

// Route to authenticate with ImageKit
exp.get('/auth', function (req, res) {
  const authenticationParameters = imageKit.getAuthenticationParameters();
  res.json(authenticationParameters);
});

exp.use("/api/users",userRouter);
exp.use("/api/posts",postRouter);

exp.use(Error);
var  PORT = process.env.PORT || 8000;
//Server port connection

exp.listen(PORT, () => {
    console.log(`server connection with port number: ${PORT}`);
  });