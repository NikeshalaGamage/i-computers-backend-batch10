import express from "express";
import mongoose from "mongoose";

import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";

const app = express();

app.use(express.json());


// MongoDB connection
const mongodbURI = "mongodb+srv://Admin:1234@cluster0.lgckafg.mongodb.net/icomputers?appName=Cluster0";


mongoose.connect(mongodbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  

// Test POST route
//app.post("/", (req, res) => {
   // console.log("Post data Recived");
   // console.log(req.body); 
  //const { name, age } = req.body;
  //res.json({
   // message: "Data received",
   // name,
    //age
  //});
//});

// Middleware



// Student routes


app.use("/users",userRouter)

app.use(authenticateUser)

app.use("/students", studentRouter);


// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
