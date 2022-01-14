const express = require('express')
const router = express.Router()

const { getAllStudentsID } = require('../../controllers/students/getAllStudentsID')

router.get('/', getAllStudentsID)

module.exports = router