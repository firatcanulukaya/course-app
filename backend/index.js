const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const app = express()

const { createStudent, editStudent, getAllStudents, getStudentInfo, deleteStudent, deleteAllStudents, createClass, getClasses, editClass, deleteClass, getClass, deleteAllClasses, createCourse, getCourses, editCourse, deleteCourse, getCourse, deleteAllCourses } = require("./routes");
const db = require("./models");

app.use(json())
app.use(cors())

//STUDENT
app.use('/api/student/createStudent', createStudent)
app.use('/api/student/editStudent', editStudent)
app.use('/api/student/getAllStudents', getAllStudents)
app.use('/api/student/getStudentInfo', getStudentInfo)
app.use('/api/student/deleteStudent', deleteStudent)
app.use('/api/student/deleteAllStudents', deleteAllStudents)

//CLASS
app.use('/api/class/createClass', createClass)
app.use('/api/class/getClasses', getClasses)
app.use('/api/class/editClass', editClass)
app.use('/api/class/deleteClass', deleteClass)
app.use('/api/class/getClass', getClass)
app.use('/api/class/deleteAllClasses', deleteAllClasses)

//COURSE
app.use('/api/course/createCourse', createCourse)
app.use('/api/course/getCourses', getCourses)
app.use('/api/course/editCourse', editCourse)
app.use('/api/course/deleteCourse', deleteCourse)
app.use('/api/course/getCourse', getCourse)
app.use('/api/course/deleteAllCourses', deleteAllCourses)

app.listen(3001, () => console.log(`Server started at http://localhost:3001`))