const mongoose = require("mongoose");
const dotenv =require("dotenv").config()

db = mongoose.createConnection(process.env.mongo_url
).on("open", ()=> {
    console.log("DB connected")
}).on("error", ()=> {
    console.log("connection error")
});


// db = mongoose.createConnection("mongodb://127.0.0.1:27017/lifeDB"
// ).on("open", ()=> {
//     console.log("DB connected")
// }).on("error", ()=> {
//     console.log("connection error")
// });

module.exports = db;
