const db = require('../models');

module.exports.createCourse = async (req, res) => {
    try {
        const {courseName, courseColor} = req.body;
        console.log(req.body);
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

module.exports.getCourses = (req, res) => {
    db.Course.findAll()
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

module.exports.editCourse = async (req, res) => {
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

module.exports.deleteCourse = async (req, res) => {
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

module.exports.getCourse = async (req, res) => {
    try {
        const {id} = req.params;
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

module.exports.deleteAllCourses = async (req, res) => {
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