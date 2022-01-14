const express = require('express')
const router = express.Router()

const { editStudent } = require('../../controllers/students/editstudent')

router.patch('/:id', editStudent)

module.exports = router