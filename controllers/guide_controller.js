const guideModel = require("../models/guide_model")

exports.getGuide = async (req,res) => {
    try{
        var hasDisorder = req.body.hasDisorder
        const guide = await guideModel.find()

        if (!hasDisorder){
            return res.status(500).send({ error: "hasDisorder is empty" })
        }
        if(hasDisorder==1){
            return res.status(200).send({status:true,guide:guide})
        }
        else if (hasDisorder==0){
            return res.status(200).send({status:true})

        }
        else{
        return res.status(500).send({status:false, error: 'invalid input' })
        }
    }
    catch (error) {
        return res.send({ status:false,error: 'failed to list guide' })
    }
  }
