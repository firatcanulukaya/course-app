const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./models')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
    let allData = await db.Student.findAll({})
    res.json(allData)
})

app.post('/addStudent', async (req, res) => {
    let data = {
        studentName: req.body.studentName,
        studentInfo: req.body.studentInfo,
        studentClassName: req.body.studentClassName
    }
    let asd = await db.Student.create(data)
    res.json(asd)
})

app.get('/d', async (req, res) => {
    await db.Student.destroy({ where: {} })
    res.json({ message: 'All of students has been deleted.' })
})

app.get('/d/:id', async (req, res) => {
    await db.Student.destroy({ where: {
        id: req.params.id
        } })
    res.json({ message: 'Student Deleted.' })
})

app.patch('/editStudent/:id', async (req, res) =>{

    let data = {
        studentName: req.body.studentName,
        studentInfo: req.body.studentInfo,
        studentClassName: req.body.studentClassName
    }
    await db.Student.update(data, {where: {
        id: req.params.id
        }})

    res.json({message: 'Student edited sucessfully.'})
})

app.get('/kgetir/:id', async (req, res) => {
    let asd = await db.Student.findOne({
        where: {
            id: req.params.id
        }
    })
    res.json(asd)
})

app.get('/getAllStudentsID', async (req, res) => {
    let allData = await db.Student.findAll({
        attributes: ['id']
    })
    res.json(allData)
})

app.listen(3001, () => {
    console.log(`Server started at http://localhost:3001`)
})