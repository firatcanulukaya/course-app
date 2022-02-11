const db = require('../models');

const createStudent = async (req, res) => {
    try {

        const {studentName, studentAge, classId} = req.body;

        let data = {
            studentName,
            studentAge,
            classId
        }
        let jsonData = await db.Student.create(data)
        res.status(201).json(jsonData)
    } catch (err) {
        res.status(500).json(err)
    }
}

const editStudent = async (req, res) => {

    try {
        const {studentName, studentAge, classId} = req.body;

        let data = {
            studentName,
            studentAge,
            classId
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

const getAllStudents = async (req, res) => {
    try {
        const students = await db.Student.findAll({
            include: ["class", "courses"]
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getStudentInfo = async (req, res) => {
    let {id} = req.params;
    try {
        const student = await db.Student.findOne({
            include: ["class", "courses"],
            where: {
                id: id
            }
        })
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteStudent = async (req, res) => {
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

        await db.StudentCourse.destroy({
            where: {
                studentId: req.params.id
            }
        })
        await student.destroy();
        res.status(200).json({
            message: 'Student deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while deleting the Student."
        });
    }
}

const deleteAllStudents = async (req, res) => {
    try {
        await db.StudentCourse.destroy({
            where: {},
            truncate: true
        });

        await db.Student.destroy({
            where: {},
            truncate: true
        })
        res.status(200).json({
            message: 'All students deleted'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting all students'
        })
    }
}

module.exports = {
    createStudent,
    editStudent,
    getAllStudents,
    getStudentInfo,
    deleteStudent,
    deleteAllStudents
}