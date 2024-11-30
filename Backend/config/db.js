const mongoose = require('mongoose');
const dotenv = require('dotenv');
const uri=process.env.URI_MONDODB;
const connectDB =async()=>{
    try{
        await mongoose.connect(uri)
        .then(()=>console.log("established a connection to the database"))
        .catch(err=>console.log("something went wrong when connecting to the ",err));
    }catch(error){
        console.error('erreur de connexion a mongoDB :',error.message);
        process.exit(1);
    }
};
module.exports=connectDB;