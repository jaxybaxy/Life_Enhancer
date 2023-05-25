const mongoose = require("mongoose");
db = mongoose.createConnection("mongodb+srv://life:CIQdUBQPCBJvODyY@life.of6y31r.mongodb.net/?retryWrites=true&w=majority"
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
