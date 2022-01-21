'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StudentCourse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            StudentCourse.belongsToMany(models.Student, {
                through: 'StudentCourse',
                foreignKey: 'studentId',
                as: 'students'
            });

            StudentCourse.belongsToMany(models.Course, {
                through: 'StudentCourse',
                foreignKey: 'courseId',
                as: 'courses'
            });

        }
    };
    StudentCourse.init({
        studentId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'StudentCourse',
    });
    return StudentCourse;
};