const db = require('../models');

const createCourse = async (req, res) => {
    try {
        const {courseName, courseColor} = req.body;
        const newCourse = await db.Course.create(
            {
                courseName,
                courseColor
            }
        );
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCourses = (req, res) => {
    db.Course.findAll({
        include:["students"]
    })
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

const editCourse = async (req, res) => {
    try {
        const {courseName, courseColor} = req.body;
        const {id} = req.params;
        const updatedCourse = await db.Course.update(
            {
                courseName,
                courseColor
            },
            {
                where: {
                    id: id
                }
            }
        );
        res.status(200).json({message: 'Course updated successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteCourse = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCourse = await db.Course.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({message: 'Course deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCourse = async (req, res) => {
    try {
        const {id} = req.query;
        const course = await db.Course.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteAllCourses = async (req, res) => {
    try {
        const deletedCourses = await db.Course.destroy({
            where: {},
            truncate: true
        });
        res.status(200).json({message: 'All courses deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const addStudentToCourse = async (req, res) => {
    try {
        const {studentId, courseId} = req.body;
        const student = await db.Student.findOne({
            where: {
                id: studentId
            }
        });
        const course = await db.Course.findOne({
            where: {
                id: courseId
            }
        });
        const studentCourse = await db.StudentCourse.create({
            studentId: course.id,
            courseId: student.id
        });
        res.status(200).json(studentCourse);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const removeStudentFromCourse = async (req, res) => {
    try {
        const {studentId, courseId} = req.body;
        const student = await db.Student.findOne({
            where: {
                id: studentId
            }
        });
        const course = await db.Course.findOne({
            where: {
                id: courseId
            }
        });
        const studentCourse = await db.StudentCourse.destroy({
            where: {
                studentId: course.id,
                courseId:  student.id
            }
        });
        res.status(200).json({message: 'Student removed from course'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createCourse,
    getCourses,
    editCourse,
    deleteCourse,
    getCourse,
    deleteAllCourses,
    addStudentToCourse,
    removeStudentFromCourse
}