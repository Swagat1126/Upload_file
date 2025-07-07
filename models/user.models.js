const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({   //  yaha pe schema banaya hai jo ki user ke liye hai  
    username:{
        type:String,     
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:5
    }
})

const user = mongoose.model('user',userSchema);  //yaha pe model banaya hai jo ki user ke liye hai 

module.exports = user;  //isko hum route folder me require karenge
//isko isliye kiya hai taki user.routes.js me iska use ho sake