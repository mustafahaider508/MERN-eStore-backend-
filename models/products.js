const mongo=require("mongoose");

const products=mongo.Schema({

    gender:{
        type:String,
        require:[true,"Please fill the gender field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
        
        
        
    },
    category:{
        type:String,
        require:[true,"Please fill the category field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
        
        
    },
    subcategory:{
        type:String,
        require:[true,"Please fill the category field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
        
        
    },
    title:{
        type:String,
        require:[true,"Please fill the title field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
     
        
        
    },
    productimage:{
        type:[Object],
        require:[true,"Please fill the image field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
     
        
        
    },
    price:{
        type:Number,
        require:[true,"Please fill the price field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
     
        
        
    },
    discription:{
        type:String,
        require:[true,"Please fill the discription field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
     
        
        
    },


})

module.exports=mongo.model("products",products)