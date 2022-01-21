const express = require('express')
const router = express.Router()

const { createStudent, editStudent, getAllStudents, getStudentInfo, deleteStudent, deleteAllStudents } = require('../controllers/studentController')

router.post('/createStudent', createStudent)
router.patch('/editStudent/:id', editStudent)
router.get('/getAllStudents', getAllStudents)
router.get('/getStudentInfo/:id', getStudentInfo)
router.delete('/deleteStudent/:id', deleteStudent)
router.delete('/deleteAllStudents', deleteAllStudents)


module.exports = router