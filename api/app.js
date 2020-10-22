const express = require("express");
const logger = require("morgan");
const cors = require('cors');
const app = express();

const userRoutes = require("./routes/users");
const quizRoutes = require("./routes/quizes");
const classroomRoutes = require("./routes/classrooms");
const questionRoutes = require("./routes/questions");

app.use(logger("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Ovako se dodaje prefix za sve učitane rute kao u Springu npr @RequestMapping('users')
app.use("/users", userRoutes);
app.use("/quizzes", quizRoutes);
app.use("/classrooms", classroomRoutes);
app.use("/questions", questionRoutes);

module.exports = app;
