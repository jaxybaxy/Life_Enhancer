exports.getNutrientData = async (queryText, pageSize) => {
  try {
    const api_key = 'qnuSQJwk5b83M28yMwzRs3o5gryxKBsByYfAl0LJ';
    const params = {
      api_key: api_key,
      query: queryText,
      dataType: ['Survey (FNDDS)'],
      pagesize: pageSize
    };
    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`;

    const module = await import('node-fetch');
    const fetch = module.default;

    async function getData() {
      const response = await fetch(api_url);
      return await response.json();
    }

    function processFoodData(food) {
      const foodNutrients = food.foodNutrients;
      const name = food.description;
      const nutrientData = {};
      nutrientData['name'] = name;
      for (let i = 0; i < foodNutrients.length; i++) {
        const nutrient = foodNutrients[i];
        nutrientData[nutrient.nutrientName] = nutrient.value;
      }
      return nutrientData;
    }

    const data = await getData();
    const nutrientDataList = data.foods.map(processFoodData);

    const filteredNutrientDataList = nutrientDataList.map((item) => {
      const filteredItem = {};
      filteredItem['name'] = item.name;
      filteredItem['Protein'] = item.Protein;
      filteredItem['Energy'] = item.Energy;
      filteredItem['Water']=item.Water;
      // filteredItem['Water']=item.Water;
      // filteredItem['Water']=item.Water;

      return filteredItem;
    });



    return filteredNutrientDataList;
  } catch (err) {
    return err;
  }
};