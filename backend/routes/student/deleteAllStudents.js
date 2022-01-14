const express = require('express')
const router = express.Router()

const { deleteAllStudents } = require('../../controllers/students/deleteAllStudents')

router.get('/', deleteAllStudents)

module.exports = router