const express = require('express')
const router = express.Router()

const { createClass, getClasses, editClass, deleteClass, getClass, deleteAllClasses } = require('../controllers/classController')

router.post('/', createClass)
router.get('/', getClasses)
router.patch('/:id', editClass)
router.delete('/:id', deleteClass)
router.get('/:id', getClass)
router.delete('/', deleteAllClasses)

module.exports = router