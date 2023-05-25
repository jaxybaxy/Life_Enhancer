const mongoose = require("mongoose");
const db = require("../util/db");
const doctorSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },address:{
        type:String
    },fee:{
        type:Number
    },rate:{
        type:Number
    },phone: {
        type: String,
        required: true,
        unique: true
    }
})
const DoctorModel = db.model("doctor",doctorSchema);
module.exports = DoctorModel;