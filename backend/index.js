const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const app = express()

const { createStudent, editStudent, getAllStudents, getStudentInfo, deleteStudent, deleteAllStudents} = require("./routes");
const db = require("./models");

app.use(json())
app.use(cors())

app.use('/api/student/createStudent', createStudent)
app.use('/api/student/editStudent', editStudent)
app.use('/api/student/getAllStudents', getAllStudents)
app.use('/api/student/getStudentInfo', getStudentInfo)
app.use('/api/student/deleteStudent', deleteStudent)
app.use('/api/student/deleteAllStudents', deleteAllStudents)

app.listen(3001, () => console.log(`Server started at http://localhost:3001`))