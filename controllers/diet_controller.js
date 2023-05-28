const DietModel = require("../models/diet_model")
const dietAPI = require('../services/diet_api')


exports.getDietForToday = async (req, res) => {
    try {
        var diet = req.body.diet
        var targetCalories = req.body.calories
        const diets = await dietAPI.getDailyMealDataModel(targetCalories, diet)
        res.status(200).send(diets)
    }
    catch (err) {
        return res.send({ status: false, error: 'failed to list exercise' })
    }
}

exports.getDietById = async (req, res) => {
    try {
        var id = req.body.id
        const diets = await dietAPI.getDietByIdModel(id)
        res.status(200).send(diets)
    }
    catch (err) {
        return res.send({ status: false, error: 'failed to list exercise' })
    }
}

exports.getAllDiets = async (req, res) => {
    try {
        const diets = await DietModel.find()
        res.status(200).send(diets)
    }
    catch (err) {
        return res.send({ status: false, error: 'failed to list exercise' })
    }
}

exports.appropriateDiet = async (req, res) => {
    try {
        var eat_gluten = req.body.gluten
        var eat_meat = req.body.meat
        var eat_fish = req.body.fish
        var eat_milk = req.body.milk
        var eat_egg = req.body.egg

        if (eat_meat == true) {
            return res.status(200).send({"name":""})

        }

        res.status(200).send(diets)
    }
    catch (err) {
        return res.send({ status: false, error: 'failed to list exercise' })
    }
}