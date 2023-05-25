const UserModel = require("../models/user_model")
const jwt = require("jsonwebtoken")
class Userservice{
    static async signUp(name,email,password,phone,weight,height,BMI){
        try{
            const user = new UserModel({name,email,password,phone,weight,height,BMI})
            return user.save();
        } catch(err) {
            return res.json({ message: err });
        }
    }
    static async checkUser(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            return res.json({ message: err });
        }
    }
    static async generateToken(token,secretKey,jwt_expire){
        return jwt.sign(token,secretKey,{expiresIn:jwt_expire});
    }
}

module.exports = Userservice;