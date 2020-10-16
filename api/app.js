const express = require("express");
const logger = require("morgan");
const app = express();

const userRoutes = require("./routes/users");
const quizRoutes = require("./routes/quizes");
const classroomRoutes = require("./routes/classrooms");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Ovako se dodaje prefix za sve učitane rute kao u Springu npr @RequestMapping('users')
app.use("/users", userRoutes);
app.use("/quizzes", quizRoutes);
app.use("/classrooms", classroomRoutes);

module.exports = app;
