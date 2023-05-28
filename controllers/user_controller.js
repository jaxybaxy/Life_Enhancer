const UserModel = require("../models/user_model");
// const Userservice = require("../services/user")
const bcrypt = require("bcrypt")
const secretKey = "secretToken" //env var
const jwt_expire = "10d" // env var
const jwt = require("jsonwebtoken")
const validator = require("validator");

// var admin = require("firebase-admin");

// var serviceAccount = require("../serviceAccountKey.json");

// admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount)
// });

// exports.signInWithGoogle = async (req, res) => {
//   const { idToken } = req.body;
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const { email, email_verified, name, picture } = decodedToken;

//     // Check if email is verified
//     if (!email_verified) {
//       return res.json({
//         status: false,
//         message: "Email is not verified",
//       });
//     }

//     // Check if user already exists in your database
//     const userExists = await UserModel.findOne({ email });
//     if (userExists) {
//       const tokenData = {id:userExists.id,email:userExists.email}
//       const token = await jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
//       //const token = await admin.auth().createCustomToken(userExists._id.toString());
//       return res.status(200).json({
//         status: true,
//         token:token,
//         user: { name: userExists.name, email: userExists.email },
//       });
//     }

//     // Create a new user in your database
//     const PhotoURL = picture
//     const newUser = new UserModel({ email, name, PhotoURL });
//     await newUser.save();
//     const resultUser = await UserModel.findOne({ email });
//     const tokenData = { id: resultUser.id, email: resultUser.email };
//     const token = await jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
//     //const token = await admin.auth().createCustomToken(newUser._id.toString());

//     res.status(200).json({
//       status: true,
//       token,
//       user: { name: newUser.name, email: newUser.email },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


exports.signInWithGoogle = async (req, res) => {
  // const { idToken } = req.body;
  try {
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, emailVerified, displayName, photoURL } = req.body;
    // const name = displayName;
    // Check if email is verified
    if (emailVerified=="false") {
      return res.json({
        status: false,
        message: "Email is not verified",
  
      });
    }

    // Check if user already exists in your database
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      const tokenData = {id:userExists.id,email:userExists.email}
      const token = await jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
      //const token = await admin.auth().createCustomToken(userExists._id.toString());
      return res.status(200).json({
        status: true,
        token:token,
        isNew:false,
        user: userExists,
      });
    }

    // Create a new user in your database
    // const PhotoURL = picture
    const newUser = new UserModel({ email:email, name:displayName, PhotoURL:photoURL });
    await newUser.save();
    const resultUser = await UserModel.findOne({ email });
    const tokenData = { id: resultUser.id, email: resultUser.email };
    const token = await jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    //const token = await admin.auth().createCustomToken(newUser._id.toString());

    res.status(200).json({
      status: true,
      token:token,
      isNew:true,
      user: resultUser,
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Internal server error" });
  }
};

exports.signUp = async (req, res) => {
  const { email, userpassword, name } = req.body;

  // Check if email is valid
  if (!validator.isEmail(email)) {
    return res.json({ status:false, message: "Invalid email format" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userpassword, salt);

    // Check if email is already registered
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.json({ status:false, message: "Email already registered" });
    }

    const user = new UserModel({ email, password, name });
    const options = { maxTimeMS: 30000 }; // 30 seconds timeout
    await user.save(options);

    const resultUser = await UserModel.findOne({ email });
    const tokenData = { id: resultUser.id, email: resultUser.email };
    const token = await jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });

    res.status(200).json({
      status: true,
      token: token,
      user: resultUser,
    });
  } catch (err) {
    return res.json({ message: err.toString() });
  }
};



exports.logIn = async(req,res) =>{
    try{
    const {email,password} = req.body;
    const User =  await UserModel.findOne({email});
    console.log(User)
    if(!User){
        res.json({ status:false, message: "User Don't Exist" });
    }
    
        const isMatch = await bcrypt.compare(password,User.password)
        //const isMatch = await user.comparePassword(password);
    if(isMatch===false){
        res.json({ status:false, message: "Invalid Password" });
    }
    User.password = ""
    const tokenData = {id:User.id,email:User.email}
    // const token = await Userservice.generateToken(tokenData,"secrettoken","10d")
    const token = await jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
    res.status(200).json({status:true,token:token,user:User})
    }catch(err){
        console.log(err)
        res.json({ message: err.toString() });
    }
}
// Read all users
exports.getAllUsers = async(req,res) => {
        try{
            const users = await UserModel.find({});
            return res.status(200).send(users);
        }
        catch (error) {
            return res.send({ status:false,error: 'failed to list users' })
        }
    }
  
  // Read a user by ID
 exports.getUserById = async (req,res) => {
        try{

            var userid =req.user.id
            if(!userid){

                return res.send({ error: `user id is empty` })

            }
            var user = await UserModel.findOne({_id:userid})
            if(!user){
                return res.send({ error: 'User not found' })

            }
            return res.status(200).send(user)

        }
        catch(error){
            return res.send({ error: 'failed to find user' })

        }
        
    }
  
  // Update a user
  exports.updateUserById = async(id, name, email, password) => {
        const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true } // Return the updated user instead of the original
        );
        return updatedUser;
    }
    
exports.updateUser = async (req,res) => {
        try{
        const {email,gender,weight, height, BMI, PhotoURL,age} = req.body;
        // const dietLevel =  await calculateDietLevel(gender, weight, height, age);
        let bmr = 0;
        let dietLevel = 0;

        if (gender === 'male') {
          bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'female') {
          bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
      
        if (bmr < 1500) {
          dietLevel = 1;
        } else if (bmr >= 1500 && bmr <= 2500) {
          dietLevel = 2;
        } else {
          dietLevel = 3;
        }
        const filter = { email };
        const update = { gender, weight, height, BMI,age, PhotoURL,dietLevel,bmr};
        const options = { new: true };

        const updatedUser = await UserModel.findOneAndUpdate(filter, update, options);
        updatedUser.password = ""
        console.log('Updated document =>', updatedUser);
        
        return res.status(200).send({status:true,user:updatedUser})
    } catch(err) {
        return res.send({status:false, error: 'failed to update user' })
    }
      };

  // Delete a user
  exports.deleteUserById = async (req,res) => {


    try{

        var userid=req.body.userid
        if(!userid){

            return res.status(500).send({ error: `User id is empty` })

        }
        var user = await UserModel.findOne({_id:userid})
        if(!user){
            return res.status(500).send({ error: 'User not found' })

        }
        await UserModel.deleteOne(user)
        return res.status(200).send("User Deleted.");

    }
    catch(error){
        return res.status(500).send({ error: 'failed to find user' })

    }

  }
// exports.calculateDietLevel = async (gender, weight, height, age) => {
// try{
//   let bmr = 0;

//   if (gender === 'male') {
//     bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
//   } else if (gender === 'female') {
//     bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
//   }

//   if (bmr < 1500) {
//     return 1;
//   } else if (bmr >= 1500 && bmr <= 2500) {
//     return 2;
//   } else {
//     return 3;
//   }
// }catch(err){
//   return res.json({ status:false, message: "unexpected error" })
// }
// }



    // req.body.ifIns = 'True'
    // req.body.password = bcrypt.hash(req.body.password, 12)
    // const user = await User.create(req.body)   
    // res.status(200).json(user)
    // }
//     return bcrypt.hash(req.body.password, 12)
//     .then(encryptedPass => {
//       const {email,password,name} = req.body
//       const user = new UserModel({email,encryptedPass,name,phone})
//       return user.save()
//     })
//     .then(result =>{
//       //res.status(200).redirect('/login') 
//       res.status(200).json({User: { name: user.name, phone: user.phone, email: user.email}})
//     })
//     .catch(err => res.json(err))
//   }