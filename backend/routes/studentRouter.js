const express = require('express')
const router = express.Router()

const { createStudent, editStudent, getAllStudents, getStudentInfo, deleteStudent, deleteAllStudents } = require('../controllers/studentController')

router.post('/', createStudent)
router.patch('/:id', editStudent)
router.get('/', getAllStudents)
router.get('/:id', getStudentInfo)
router.delete('/:id', deleteStudent)
router.delete('/', deleteAllStudents)


module.exports = router