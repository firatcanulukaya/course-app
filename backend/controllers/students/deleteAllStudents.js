const db = require('../../models');

module.exports.deleteAllStudents = async (req, res) => {
    try {
        await db.Student.destroy({where: {}})
        res.status(200).json({
            message: 'All students deleted'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting all students'
        })
    }
}