const api_key = '261fdba0020c42e6bfc2b28449907233';
// const fetch = require('node-fetch');
const DietModel = require("../models/diet_model")

exports.getDailyMealDataModel = async (targetCalories, diet) => {
  try {

    const params = {
      api_key: api_key,
      timeFrame: 'day',
      targetCalories: targetCalories,
      diet: diet
    };

    const api_url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${encodeURIComponent(params.api_key)}&timeFrame=${encodeURIComponent(params.timeFrame)}&targetCalories=${encodeURIComponent(params.targetCalories)}&diet=${encodeURIComponent(params.diet)}`
    // const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`;

    const module = await import('node-fetch');
    const fetch = module.default;

    async function getData() {
      const response = await fetch(api_url);
      return await response.json();
    }
    var data = getData()
    return data
  } catch (err) {
    return err;
  }
};

exports.getDietByIdModel = async (id) => {
  try {
    const params = {
      api_key: api_key,
      id: id

    };

    const api_url = `https://api.spoonacular.com/recipes/${encodeURIComponent(params.id)}/nutritionWidget.json?apiKey=${encodeURIComponent(params.api_key)}`
    // const api_url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${encodeURIComponent(params.api_key)}&timeFrame=${encodeURIComponent(params.timeFrame)}&targetCalories=${encodeURIComponent(params.targetCalories)}&diet=${encodeURIComponent(params.diet)}`

    // const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`;

    const module = await import('node-fetch');
    const fetch = module.default;

    async function getData() {
      const response = await fetch(api_url);
      return await response.json();
    }

    async function filter_main_nutrient(data) {

      var filteredData = {}
      filteredData['calories'] = data.calories;
      filteredData['carbs'] = data.carbs;
      filteredData['protein'] = data.protein;
      filteredData['fat'] = data.fat;

      return filteredData

      console.log(filteredData)
    }


    async function ingredients(data) {
      var ingredients = data.ingredients;
      var filteredDataArray = [];
    
      for (let i = 0; i < ingredients.length; i++) {
        var filteredData = {};
        filteredData['id'] = ingredients[i].id;
        filteredData['name'] = ingredients[i].name;
        filteredData['amount'] = ingredients[i].amount;
        filteredData['unit'] = ingredients[i].unit;

        filteredDataArray.push(filteredData);
      

      }
    
      return filteredDataArray
      console.log(filteredDataArray);
    }


    var data = await getData()
    console.log(await filter_main_nutrient(data))
    var final_data={}
    final_data["nutrients"]=await filter_main_nutrient(data)
    final_data["ingredients"]=await ingredients(data)


    return final_data
  } catch (err) {
    return err;
  }
};



