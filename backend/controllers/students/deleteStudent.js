const db = require('../../models');

module.exports.deleteStudent = async (req, res) => {
    try{
        const student = await db.Student.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!student){
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        await student.destroy();
        return res.status(200).json({
            message: 'Student deleted'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while deleting the Student."
        });
    }
}