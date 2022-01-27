'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.belongsTo(models.Class, {
                foreignKey: 'classId',
                as: 'class'
            });
            Student.belongsToMany(models.Course, {
                through: 'StudentCourse',
                foreignKey: 'studentId',
                as: 'courses'
            });
        }
    };
    Student.init({
        studentName: DataTypes.STRING,
        studentAge: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};