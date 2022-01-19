const db = require('../models');

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

module.exports.editStudent = async (req, res) => {

    try {
        let data = {
            studentName: req.body.studentName,
            studentInfo: req.body.studentInfo,
            studentClassName: req.body.studentClassName
        }

        await db.Student.update(data, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({message: 'Student edited sucessfully.'})
    } catch (err) {
        res.json({message: err})
    }

}

module.exports.getAllStudents = async (req, res) => {
    try {
        const students = await db.Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

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

module.exports.deleteStudent = async (req, res) => {
    try {
        const student = await db.Student.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        await student.destroy();
        return res.status(200).json({
            message: 'Student deleted'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while deleting the Student."
        });
    }
}

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