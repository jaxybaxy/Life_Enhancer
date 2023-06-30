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
        res.status(200).send({status:true,result:result})


    }
    catch(err){
        return res.send({status:false,error:"failed"})
    }
  }