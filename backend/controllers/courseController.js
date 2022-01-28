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
        const {id} = req.params;
        const course = await db.Course.findOne({
            include: ["students"],
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

const addStudentToMultipleCourse = async (req, res) => {
    try {
        const {studentId, courseIds} = req.body;
        const student = await db.Student.findOne({
            where: {
                id: studentId
            }
        });
        const courses = await db.Course.findAll({
            where: {
                id: courseIds
            }
        });
        const studentCourses = await db.StudentCourse.bulkCreate(
            courses.map(course => {
                return {
                    studentId: student.id,
                    courseId: course.id
                }
            })
        );

        !student || !courses ? res.status(404).json({message: 'Student or courses not found'}) : res.status(200).json({message: 'Student added to courses successfully'});

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
                studentId: student.id,
                courseId:  course.id
            }
        });
        res.status(200).json({message: 'Student removed from course'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const addMultipleStudentsToCourse = async (req, res) => {
    try {
        const {studentIds, courseId} = req.body;
        const students = await db.Student.findAll({
            where: {
                id: studentIds
            }
        });
        const course = await db.Course.findOne({
            where: {
                id: courseId
            }
        });
        const studentCourses = await db.StudentCourse.bulkCreate(
            students.map(student => {
                return {
                    studentId: student.id,
                    courseId: course.id
                }
            })
        );
        res.status(200).json({message: 'Students added to course'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createCourse,
    getCourses,
    editCourse,
    deleteCourse,
    getCourse,
    deleteAllCourses,
    removeStudentFromCourse,
    addStudentToMultipleCourse,
    addMultipleStudentsToCourse
}