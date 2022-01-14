const express = require('express')
const router = express.Router()

const { deleteStudent } = require('../../controllers/students/deleteStudent')

router.get('/:id', deleteStudent)

module.exports = router