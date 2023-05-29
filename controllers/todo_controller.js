const ExerciseModel = require("../models/exercise_model")
const DietModel = require("../models/diet_model")
const UserModel = require("../models/user_model")
exports.dailyTask = async (req, res) => {
    try {
        const email= req.user.email
        const user = await UserModel.findOne({email})
        // const date = new Date.now()
        // console.log(date.getDay())
        var level = user.exerciceLevel
        const exercises = await ExerciseModel.find({ Level: level }).limit(10);
        res.status(200).send({ status: true, exercise: exercises})}

    catch (err) {
            return res.send({ status: false, error: 'failed to list exercise' })
        }
    }