const DietModel = require("../models/diet_model")
const dietAPI = require('../services/diet_api')
const api_key = '261fdba0020c42e6bfc2b28449907233';


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


exports.getDietByWeek = async (req, res) => {  
    try {
        const apiKey = '261fdba0020c42e6bfc2b28449907233';
        async function generateWeeklyDietPlan(apiKey) {
            const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=week&targetCalories=2000`);
            const data = await response.json();
            return data;
          }
          
          // Function to save the diet plan to the database
          async function saveDietPlanToDatabase(dietPlan) {
            const savedPlan = await DietModel.create({ description: dietPlan });
            return savedPlan;
          } 
      const dietPlan = await generateWeeklyDietPlan(apiKey);
      const savedPlan = await saveDietPlanToDatabase(dietPlan);
      res.json(savedPlan);
    } catch (error) {
      console.error('Error:', error);
      res.json({ error: 'An error occurred.' });
    }
  };