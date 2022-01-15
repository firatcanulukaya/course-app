const express = require('express')
const router = express.Router()

const { createStudent, deleteAllStudents, deleteStudent, editStudent, getAllStudents, getAllStudentsID, getStudentInfo } = require('../controllers/studentController')

router.post('/', createStudent)
router.get('/', deleteAllStudents)
router.get('/:id', deleteStudent)
router.patch('/:id', editStudent)
router.get('/', getAllStudents)
router.get('/', getAllStudentsID)
router.get('/:id', getStudentInfo)

module.exports = router