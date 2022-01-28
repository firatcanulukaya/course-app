const express = require('express')
const router = express.Router()

const { createCourse, getCourses, editCourse, deleteCourse, getCourse, deleteAllCourses, removeStudentFromCourse, addStudentToMultipleCourse, addMultipleStudentsToCourse} = require('../controllers/courseController')

router.post('/create', createCourse)
router.get('/getAll', getCourses)
router.patch('/edit/:id', editCourse)
router.delete('/delete/:id', deleteCourse)
router.get('/get/:id', getCourse)
router.delete('/deleteAll', deleteAllCourses)
router.post('/addStudentToCourse', addStudentToMultipleCourse)
router.post('/addMultipleStudentsToCourse', addMultipleStudentsToCourse)
router.delete('/removeStudentFromCourse', removeStudentFromCourse)

module.exports = router