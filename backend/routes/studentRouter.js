const express = require('express')
const router = express.Router()

const { createStudent, editStudent, getAllStudents, getStudentInfo, deleteStudent, deleteAllStudents } = require('../controllers/studentController')

router.post('/create', createStudent)
router.patch('/edit/:id', editStudent)
router.get('/getAll', getAllStudents)
router.get('/get/:id', getStudentInfo)
router.delete('/delete/:id', deleteStudent)
router.delete('/deleteAll', deleteAllStudents)


module.exports = router