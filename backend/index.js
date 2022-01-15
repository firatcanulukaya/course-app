const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const app = express()

const {
    getAllStudents,
    createStudent,
    deleteAllStudents,
    deleteStudent,
    editStudent,
    getStudentInfo,
    getAllStudentsID
} = require("./routes");

app.use(json())
app.use(cors())

app.use('/api/getAllStudents', getAllStudents)
app.use('/api/createStudent', createStudent)
app.use('/api/deleteAllStudents', deleteAllStudents)
app.use('/api/deleteStudent', deleteStudent)
app.use('/api/editStudent', editStudent)
app.use('/api/getStudentInfo', getStudentInfo)
app.use('/api/getAllStudentsID', getAllStudentsID)

app.listen(3001, () => {
    console.log(`Server started at http://localhost:3001`)
})