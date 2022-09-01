const express=require("express")
const multer=require("multer")
const app=express();
const cors=require("cors")
const bodyParser=require("body-parser");
require("dotenv").config();
const mongo = require("mongoose");
const registrationSchema = require("./models/registration");
const products = require("./models/products");
require("dotenv").config();

//middileware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())
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
    } else if (req.body.password != req.body.cpassword) {
      res.send("Enter same password");
    } else {
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
          var error = err.message;
          res.send(error.slice(38));
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
// multer import multer from "multer";
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callB) => {
    return callB(null, `img-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
 const uploadFile = multer({
  storage: storage,
});
  app.post("/products",uploadFile.fields([
    { name: "productimage", maxCount: 1 },
  ]),(req,res)=>{
    console.log(req.body)
    const productimage = req.files.productimage.map((it) => it.filename);
    const data = new products();
      data.gender = req.body.gender;
      data.category = req.body.category;
      data.subcategory = req.body.subcategory;
      data.price = req.body.price;
      data.discription = req.body.discription;
      data.title = req.body.title;
      data.productimage = productimage;
  
      data
        .save()
        .then(() => {
          res.send("Product Added");
        })
        .catch((err) => {
          var error = err.message;
          res.send(error.slice(38));
        });

  })

  app.get("/getproduct", async(req,res)=>{
    var product= await products.find()
    res.send(product)
  })

app.listen(process.env.PORT ||5000,()=>{console.log("server is on!!!!")})