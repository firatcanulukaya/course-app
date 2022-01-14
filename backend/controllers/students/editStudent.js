const db = require('../../models');

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