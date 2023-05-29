const mongoose = require("mongoose");
const db = require("../util/db");
const doctorSchema = new mongoose.Schema({
    Doctor: {
        type:String,
        required:true
    },Description:{
        type:String
    },Brief:{
        type:Number
    },Area:{
        type:Number
    },Address: {
        type: String,
    },Rate: {
        type: String,
    },Price: {
        type: String,
    },Link: {
        type: String,
    },Phone_number: {
        type: String,
    }
})
const DoctorModel = db.model("doctor",doctorSchema);
module.exports = DoctorModel;