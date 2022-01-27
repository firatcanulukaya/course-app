'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course.belongsToMany(models.Student, {
                through: 'StudentCourse',
                foreignKey: 'courseId',
                as: 'students'
            });
        }
    };
    Course.init({
        courseName: DataTypes.STRING,
        courseColor: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};