const food_api=require('../services/food_api')

exports.getfood = async (req, res) => {
    try {
        var query= req.body.query
        var pageSize = req.body.pageSize

        var food = await food_api.getNutrientData(query,pageSize)
        
        return res.status(200).send({ status: true, food: food });
    }
    catch (error) {
        return res.send({ status: false, error: 'failed to list food' })
    }
}