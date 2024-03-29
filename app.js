const express = require("express");
const app = express();
const db = require("./util/db")
const userRoutes = require("./routes/user_route")
const doctorRoutes = require("./routes/doctor_route")
const exerciseRoutes = require("./routes/exercise_route")
const foodRoutes = require("./routes/food_route")
const todoRoutes = require("./routes/todo_route")
const dietRoutes = require("./routes/diet_route")
const questionnaireRoutes = require("./routes/questionnaire_route")
const guideRoutes = require("./routes/guide_route")



const bodyParser = require('body-parser');
// const cors = require('cors');

const port = process.env.port || 5000
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

// app.use(cors())
app.use("/doctor",doctorRoutes)
app.use("/user",userRoutes)
app.use("/exercise",exerciseRoutes)
app.use("/food",foodRoutes)
app.use("/todo",todoRoutes)
app.use("/diet",dietRoutes)
app.use("/questionnaire",questionnaireRoutes)
app.use("/guide",guideRoutes)

app.listen(port)