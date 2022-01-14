const db = require('../../models');

module.exports.getStudentInfo = async (req, res) => {
    try {
        let data = await db.Student.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}