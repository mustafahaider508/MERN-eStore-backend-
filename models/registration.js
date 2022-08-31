const mongo=require("mongoose");

const schemaregistration=mongo.Schema({

    username:{
        type:String,
        require:[true,"Please fill the username field"],
        trim:true,
        minlength:[3,"Minimum three letters required"], 
        maxlength:15,
        
        
    },

    email:{
        type:String,
        require:[true,"Please fill the email field"],
        unique: [true, "email already exists in database!"],
        trim:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        
    },
    password:{
        type:String,
        require:[true,"Please fill the password field"],
        trim:true,
        minlength:[9,"Minimum nine letters required"], 
        maxlength:15,
    },
    gender:{
        type:String,
        require:[true,"Please select the gender field"],
        //enum:["male", "female"],
    }
})

module.exports=mongo.model("schemaregistration",schemaregistration)