const db = require('../../models');

module.exports.getAllStudentsID = async (req, res) => {
    try {
        let data = await db.Student.findAll({
            attributes: ['id']
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}