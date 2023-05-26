const ExerciseModel = require("../models/exercise_model")

exports.dailyTask = async (req, res) => {
    try {
        diet = [{
            "calories": 210,
            "carbs": "43g",
            "fat": "3g",
            "id": 90629,
            "image": "https://spoonacular.com/recipeImages/90629-312x231.jpg",
            "protein": "1g",
            "title": "Baked Apples in White Wine"
        },
        {
            "calories": 226,
            "carbs": "33g",
            "fat": "10g",
            "id": 284420,
            "image": "https://spoonacular.com/recipeImages/284420-312x231.jpg",
            "protein": "2g",
            "title": "Chocolate Silk Pie with Marshmallow Meringue"
        }]
        var level = req.body.level
        const exercises = await ExerciseModel.find({ Level: level }).limit(10);
        res.status(200).send({ status: true, exercise: exercises, diet:diet})}

    catch (err) {
            return res.send({ status: false, error: 'failed to list exercise' })
        }
    }