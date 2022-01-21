const db = require('../models');

//TODO class controller'ın içinden öğrenci ekleme yapılacak

const createClass = async (req, res) => {
    try {
        const {className} = req.body;
        const newClass = await db.Class.create({
            className
        });
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getClasses = async (req, res) => {
    try {
        const classes = await db.Class.findAll(
            {
                include: [
                    {
                        model: db.Student,
                        as: 'students'
                    }
                ]
            },
            {
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        );
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const editClass = async (req, res) => {
    try {
        const {className} = req.body;
        const {id} = req.params;
        const updatedClass = await db.Class.update(
            {className},
            {where: {id}}
        );
        res.status(200).json({message: 'Class updated successfully', updatedClass});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteClass = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedClass = await db.Class.destroy({
            where: {id}
        });
        res.status(200).json({message: 'Class deleted successfully', deletedClass});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getClass = async (req, res) => {

    try {
        const {id} = req.params;
        const classInfo = await db.Class.findOne({
            where: {id},
            include: [
                {
                    model: db.Student,
                    as: 'students'
                }
            ]
        });
        res.status(200).json(classInfo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteAllClasses = async (req, res) => {
    try {
        const deletedClasses = await db.Class.destroy({
            where: {},
            truncate: true
        });
        res.status(200).json({message: 'All classes deleted successfully', deletedClasses});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createClass,
    getClasses,
    editClass,
    deleteClass,
    getClass,
    deleteAllClasses
}