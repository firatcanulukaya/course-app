const express = require('express')
const router = express.Router()

const { createCourse, getCourses, editCourse, deleteCourse, getCourse, deleteAllCourses} = require('../controllers/courseController')

router.post('/', createCourse)
router.get('/', getCourses)
router.patch('/:id', editCourse)
router.delete('/:id', deleteCourse)
router.delete('/:id', deleteCourse)
router.get('/:id', getCourse)
router.delete('/', deleteAllCourses)

module.exports = router