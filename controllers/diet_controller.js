const DietModel = require("../models/diet_model")
const UserModel = require("../models/user_model")
const DietNamesModel = require("../models/dietNames_model")
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
        const diets = await DietNamesModel.find()
        res.status(200).send(diets)
    }
    catch (err) {
        return res.send({ status: false, error: 'failed to list exercise' })
    }
}

exports.appropriateDiet = async (req, res) => {
    try {
        var diet;
        var hasAllergies = req.body.hasAllergies
        var wantsToLoseWeight = req.body.wantsToLoseWeight
        var isLightlyActive = req.body.isLightlyActive
        var isVeryActive = req.body.isVeryActive
        var isVegetarian = req.body.isVegetarian
        var isWillingToGiveUpGrains = req.body.isWillingToGiveUpGrains
        var eatsMilk = req.body.eatsMilk
        var eatsEggs = req.body.eatsEggs

        if (hasAllergies) {
            console.log('Gluten Free');
            diet = "Gluten Free"
            // res.status(200).send({"diet":diet}) 
        }

        else if (wantsToLoseWeight) {
            if (isLightlyActive) {
                console.log('Ketogenic');
                diet = "Ketogenic"
                // res.status(200).send({"diet":diet}) 
            } else if (isVeryActive) {
                console.log('Low FODMAP');
                diet = 'Low FODMAP'
                // res.status(200).send({"diet":diet}) 
            }
            else{
                console.log('Paleo');
                diet = 'Paleo'
            }
        }

        else if (isVegetarian) {
            if (eatsEggs && eatsMilk) {
                console.log('Vegetarian');
                diet =  'Vegetarian'
                // res.status(200).send({"diet":diet}) 
            }
            else if (!eatsEggs && !eatsMilk) {
                console.log('Vegan');
                diet = 'Vegan'
                // res.status(200).send({"diet":diet}) 
            }
            else if (!eatsEggs) {
                console.log('Lacto-Vegetarian');
                diet = 'Lacto-Vegetarian'
                // res.status(200).send({"diet":diet}) 
            }
            else if (!eatsMilk) {
                console.log('Ovo-Vegetarian');
                diet = 'Ovo-Vegetarian'
                // res.status(200).send({"diet":diet}) 
            }

        }

        else if (!isVegetarian && !isWillingToGiveUpGrains && eatsEggs && eatsMilk ) {
            console.log('Primal');
            diet = 'Primal'
            // res.status(200).send({"diet":diet}) 
        }

        else {
            console.log('Whole30');
            diet = 'Whole30'
            // res.status(200).send({"diet":diet}) 
        }
        const diets = await DietNamesModel.find({"name":diet})
        // console.log(diets)
        res.status(200).send({status:true,diet:diets})
    }
    catch (err) {
        return res.send({ status: false, error: 'failed to list exercise' })
    }
}


exports.getDietByWeek = async (req, res) => {
    try {
        const email = req.user.email;

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
       
    const filter = { email };
    const update = { dietPlan: savedPlan._id };
    const options = { new: true };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, options);

    if (!updatedUser) {
        throw new Error('User not found');
    }
    console.log(updatedUser)
    res.json(savedPlan);
    } catch (error) {
        console.error('Error:', error);
        res.json({ error: 'An error occurred.' });
    }
};


exports.getDietByWeekID = async (req, res) => {
    try {
        const email = req.user.email
        const user = await UserModel.findOne({ email });
        const diet = await DietModel.findById(user.dietPlan)
        res.send(diet)
    } catch (error) {
        console.error('Error:', error);
        res.json({ error: 'An error occurred.' });
    }
};