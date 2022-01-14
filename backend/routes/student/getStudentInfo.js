const express = require('express')
const router = express.Router()

const { getStudentInfo } = require('../../controllers/students/getStudentInfo')

router.get('/:id', getStudentInfo)

module.exports = router