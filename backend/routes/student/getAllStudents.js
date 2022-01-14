const express = require('express')
const router = express.Router()

const { getAllStudents } = require('../../controllers/students/getAllStudents')

router.get('/', getAllStudents)

module.exports = router