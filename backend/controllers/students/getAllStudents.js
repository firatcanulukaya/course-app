const db = require('../../models');

module.exports.getAllStudents = async (req, res) => {
    try {
        const students = await db.Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}