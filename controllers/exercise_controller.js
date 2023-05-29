const ExerciseModel = require("../models/exercise_model")


exports.getAllExercises = async (req,res) => {
    try{
        const exercises = await ExerciseModel.aggregate([
            { $sample: { size: 10 } }, // Randomly select 10 exercises
          ]);
        return res.status(200).send({status:true,exercises:exercises})

    }
    catch (error) {
        return res.send({ status:false,error: 'failed to list exercises' })
    }
  }
  
  // get exercise by ID
exports.getExerciseById = async(req,res) => {
    try{
        var id = req.body.id
        const exercise = await ExerciseModel.findById(id);  
        // console.log(exercise)
        res.status(200).send({status:true,exercise:exercise})}

    catch(err){
        return res.send({ status:false,error: 'failed to list exercise' })
    }
  }
  exports.getExerciseByLevel = async(req,res) => {
    try{
        var level = req.body.level
        const exercises = await ExerciseModel.find({Level:level});
        console.log(exercises)

        res.status(200).send({status:true,exercise:exercises})}

    catch(err){
        return res.send({ status:false,error: 'failed to list exercise' })
    }
  }

//   exports.getExercisePagination = async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1; // Get the page number from query parameter, default to page 1
//       const perPage = 10; // Number of exercises per page
  
//       const totalCount = await ExerciseModel.countDocuments({}); // Get the total count of exercises
//       const totalPages = Math.ceil(totalCount / perPage); // Calculate the total number of pages
  
//       const exercises = await ExerciseModel.find({})
//         .skip((page - 1) * perPage) // Calculate the number of documents to skip based on the page
//         .limit(perPage); // Limit the number of documents to retrieve per page
  
//       res.status(200).send({
//         status: true,
//         exercise: exercises,
//         currentPage: page,
//         totalPages: totalPages,
//         totalCount: totalCount,
//       });
//     } catch (err) {
//       return res.send({ status: false, error: 'Failed to list exercises' });
//     }
//   };