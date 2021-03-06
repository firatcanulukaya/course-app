const express = require('express')
const router = express.Router()

const { createClass, getClasses, editClass, deleteClass, getClass, deleteAllClasses, addMultipleStudentsToClass, removeStudentFromClass } = require('../controllers/classController')

router.post('/create', createClass)
router.get('/getAll', getClasses)
router.patch('/edit/:id', editClass)
router.delete('/delete/:id', deleteClass)
router.get('/get/:id', getClass)
router.delete('/deleteAll', deleteAllClasses)
router.patch('/addStudents', addMultipleStudentsToClass)
router.patch('/removeStudent/:studentId', removeStudentFromClass)

module.exports = router