const express = require('express')
const router = express.Router()

const { createCourse, getCourses, editCourse, deleteCourse, getCourse, deleteAllCourses, addStudentToCourse, removeStudentFromCourse} = require('../controllers/courseController')

router.post('/createCourse', createCourse)
router.get('/getCourses', getCourses)
router.patch('/editCourse/:id', editCourse)
router.delete('/deleteCourse/:id', deleteCourse)
router.get('/getCourse/:id', getCourse)
router.delete('/deleteAllCourses', deleteAllCourses)
router.post('/addStudentToCourse', addStudentToCourse)
router.delete('/removeStudentFromCourse', removeStudentFromCourse)

module.exports = router