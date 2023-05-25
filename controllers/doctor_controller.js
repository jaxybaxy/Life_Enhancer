const DoctorModel = require("../models/doctor_model")

//get doctors list
exports.getDoctorsList = async (req, res) => {

    await DoctorModel.find({}).lean().exec(function (err, doctors) {
        return res.status(200).json(doctors);
    })

}
// get doctor by ID
exports.getDoctorById = async (req, res) => {
    const doctorId = req.body.id;

    if (!doctorId) {
        return res.status(500).send({ error: `doctorID is empty` })
    }

    
    DoctorModel.findOne({ _id: doctorId }).lean().exec(function (err, doctor) {
        if(!doctor){
            console.log(err)
            return res.status(500).send("Doctor not found")
        }

        return res.status(200).json(doctor);

        
    });
}