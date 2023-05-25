const DietModel = require("../models/diet_model")
exports.getAllDiets = async () => {
    try{
        const diets = await DietModel.find({});
        res.status(200).json({diets})}
    catch(err){
        res.json({ message: err });
    }
  }
  
  // get diet by ID
exports.getDietById = async(id) => {
    try{
        const diet = await DietModel.findById(id);
        res.status(200).json({diet})}
    catch(err){
        res.json({ message: err });
    }
  }