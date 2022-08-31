const express=require("express")
const app=express();
const cors=require("cors")
const bodyParser=require("body-parser");
require("dotenv").config();
const mongo = require("mongoose");
const registrationSchema = require("./models/registration");
const products = require("./models/products");
require("dotenv").config();
app.use(cors())
//middileware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });


  app.get("/",(req,res)=>{
    res.send("hello mustafa")
  })
  

  mongo
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DataBase is Connected");
  })
  .catch((e) => {
    console.log("Database is not connected;", e);
  });



  app.post("/userregistration", async (req, res) => {
    console.log(req.body);
    //res.send(req.body)
  
    const data1 = await registrationSchema.find({ email: req.body.email });

  
    if (data1.length == 1) {
      res.send("This Email is already exist");
    }
    //  else if (req.body.password != req.body.cpassword) {
    //   res.send("Enter same password");
    //}
     else 
    {
      const data = new registrationSchema();
      data.username = req.body.username;
      data.email = req.body.email;
      data.password = req.body.password;
  
      data
        .save()
        .then(() => {
          res.send("User Registered");
        })
        .catch((err) => {
         
          res.send(err.message);
        });
    }
  });

			


  app.post("/signin", async (req, res) => {
    // console.log(req.body)
    const data1 = await registrationSchema.find({ email: req.body.email });
  
    if (data1.length == 0) {
      res.send({msg:"invalid Email"});
    } else if (data1[0].password != req.body.password) {
      res.send({ msg: "Incorrect Password" });
    } else {
      res.send({
        user:data1[0],
        msg: "log In Successful",
       
      });
    }
  });

  app.post("/products",(req,res)=>{
    console.log(req.body)

    const data = new products();
      data.gender = req.body.gender;
      data.category = req.body.category;
      data.subcategory = req.body.subcategory;
      data.price = req.body.price;
      data.discription = req.body.discription;
      data.title = req.body.title;
      data.productimage = req.body.productimage;
  
      data
        .save()
        .then(() => {
          res.send("Product Added");
        })
        .catch((err) => {
          res.send(err);
        });

  })



  app.get("/getproducts",(req,res)=>{
  
    const data = new products.find();
  
      data
        .save()
        .then(() => {
          res.send(data);
        })
        .catch((err) => {
          res.send(err);
        });

  })



app.listen(process.env.PORT ||5000,()=>{console.log("server is on!!!!")})