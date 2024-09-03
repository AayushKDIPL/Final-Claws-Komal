const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
.then(()=>{
    console.log("mongo connected")
})
.catch(()=>{
    console.log("error")
})

const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    passward:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:true,
    }
})

const Collection=new mongoose.model("AuthCollection",Schema)

module.exports = Collection