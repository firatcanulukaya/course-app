const express = require('express')
const router = express.Router()

const { createStudent } = require('../../controllers/students/createStudent')

router.post('/', createStudent)

module.exports = router