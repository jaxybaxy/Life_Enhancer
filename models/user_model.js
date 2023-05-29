const mongoose = require("mongoose");
const db = require("../util/db");
// const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase:true,
        unique:true
    },password: {
        type: String,
        // required: true

    },name: {
        type:String,
        required:true
    }
    ,weight:{
        type:Number
    },height:{
        type:Number
    }
    ,BMI:{
        type:String
    },PhotoURL:{
        type: String
    },dietLevel:{
        type:Number
    },exerciceLevel:{
        type:Number
    },gender:{
        type:String
    },age:{
        type:Number
    },bmr:{
        type:Number
    },diet:{
        type:String
    },dietPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DietModel'
    }
})

// userSchema.pre("save", async function(){
//     const user = this;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(user.password,salt);
//     user.password = hashedPass;
// })
// userSchema.methods.comparePassword() = async function(password){
//     try{
//         const isMatch = await bcrypt.compare(password,this.password)
//         return isMatch;
//     }catch(err){
//         throw err;
//     }
// }

const UserModel = db.model("user",userSchema);
//console.log("userschema created")





module.exports = UserModel;