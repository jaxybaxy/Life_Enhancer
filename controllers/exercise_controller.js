const ExerciseModel = require("../models/exercise_model")


exports.getAllExercises = async (req,res) => {
    try{
        const exercises = await ExerciseModel.find({});
        return res.status(200).send({status:true,exercises:exercises})

    }
    catch (error) {
        return res.send({ status:false,error: 'failed to list exercises' })
    }
  }
  
  // get exercise by ID
exports.getExerciseById = async(req,res) => {
    try{
        var id = req.body.id
        const exercise = await ExerciseModel.findById(id);
        res.status(200).send({status:true,exercise:exercise})}

    catch(err){
        return res.send({ status:false,error: 'failed to list exercise' })
    }
  }
  exports.getExerciseByLevel = async(req,res) => {
    try{
        var level = req.body.level
        const exercises = await ExerciseModel.find({Level:level});
        console.log(exercises)
        res.status(200).send({status:true,exercise:exercises})}

    catch(err){
        return res.send({ status:false,error: 'failed to list exercise' })
    }
  }