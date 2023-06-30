const QuestionnaireModel = require("../models/questionnaire_model")

exports.getQuestions = async (req,res) => {
    try{
        const questions = await QuestionnaireModel.find()
        return res.status(200).send({status:true,questions:questions})

    }
    catch (error) {
        return res.send({ status:false,error: 'failed to list questions' })
    }
  }

  exports.getQuestionByID = async(req,res) => {
    try{
        var id = req.body.id
        const question = await QuestionnaireModel.findById(id);  
        res.status(200).send({status:true,question:question})}

    catch(err){
        return res.send({ status:false,error: 'failed to list question' })
    }
  }
  exports.postResult=async(req,res)=>{
    try{
        var result = req.body.result
        var isDisorder
        if(result>=0.5 && result<=1){
            isDisorder = 1
        }else if (result>0 && result<0.5) {
            isDisorder = 0
        }else {
            return res.send({status:false,error: 'invalid input'})
        }
        res.status(200).send({status:true,isDisorder:isDisorder})


    }
    catch(err){
        return res.send({status:false,error:"failed"})
    }
  }