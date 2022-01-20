module.exports = {
    //STUDENTS
    createStudent: require('./studentRouter'),
    editStudent: require('./studentRouter'),
    getAllStudents: require('./studentRouter'),
    getStudentInfo: require('./studentRouter'),
    deleteStudent: require('./studentRouter'),
    deleteAllStudents: require('./studentRouter'),

    //CLASS
    createClass: require('./classRouter'),
    getClasses: require('./classRouter'),
    editClass: require('./classRouter'),
    deleteClass: require('./classRouter'),
    getClass: require('./classRouter'),
    deleteAllClasses: require('./classRouter'),

    //COURSE
    createCourse: require('./courseRouter'),
    getCourses: require('./courseRouter'),
    editCourse: require('./courseRouter'),
    deleteCourse: require('./courseRouter'),
    getCourse: require('./courseRouter'),
    deleteAllCourses: require('./courseRouter'),
}