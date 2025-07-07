const mongoose = require('mongoose'); 

function connectTODB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('DB connected');
    })
}
module.exports = connectTODB;   //isko isliye kiya hai taki app.js me iska use ho sake
