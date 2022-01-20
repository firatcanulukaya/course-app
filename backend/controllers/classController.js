const db = require('../models');

module.exports.createClass = async (req, res) => {
  try {
    const { className } = req.body;
    const newClass = await db.Class.create({
      className
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getClasses = async (req, res) => {
  try {
    const classes = await db.Class.findAll();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.editClass = async (req, res) => {
  try {
    const { className } = req.body;
    const { id } = req.params;
    const updatedClass = await db.Class.update(
      { className },
      { where: { id } }
    );
    res.status(200).json({message: 'Class updated successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await db.Class.destroy({
      where: { id }
    });
    res.status(200).json({message: 'Class deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classInfo = await db.Class.findOne({
      where: { id }
    });
    res.status(200).json(classInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteAllClasses = async (req, res) => {
  try {
    const deletedClasses = await db.Class.destroy({
      where: {},
      truncate: true
    });
    res.status(200).json({message: 'All classes deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};