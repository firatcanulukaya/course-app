const db = require('../../models');

module.exports.createStudent = async (req, res) => {
    try {
        let data = {
            studentName: req.body.studentName,
            studentInfo: req.body.studentInfo,
            studentClassName: req.body.studentClassName
        }
        let jsonData = await db.Student.create(data)
        res.status(200).json(jsonData)
    } catch (err) {
        res.status(500).json(err)
    }
}