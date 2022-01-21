const express = require('express')
const router = express.Router()

const { createClass, getClasses, editClass, deleteClass, getClass, deleteAllClasses } = require('../controllers/classController')

router.post('/createClass', createClass)
router.get('/getClasses', getClasses)
router.patch('/editClass/:id', editClass)
router.delete('/deleteClass/:id', deleteClass)
router.get('/getClass/:id', getClass)
router.delete('/deleteAllClasses', deleteAllClasses)

module.exports = router