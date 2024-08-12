const doctorController = {};
const { Doctors } = require("../models/index");

doctorController.create = async (req, res) => {
  const { name, Bio, Specialty } = req.body;

  try {
    if (!name || !Bio || !Specialty) {
      res.status(400).json({
        success: true,
        message: "Invalid Information",
      });
      return;
    }
    await Doctors.create({
      name,
      Bio,
      Specialty,
    });

    res.status(200).json({
      success: true,
      message: "Artist created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating artist",
      error: error.message,
    });
  }
};

doctorController.getAll = async (req, res) => {
  try {
    const doctors = await Doctors.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json({
      success: true,
      message: "Artist retreived successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retreived artist",
      error: error.message,
    });
  }
};

doctorController.getById = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctors.findByPk(doctorId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

   
    if (!doctor) {
      res.status(404).json({
        success: true,
        message: "Artists not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retreived artist",
      error: error.message,
    });
  }
};

doctorController.update = async (req, res) => {
  const doctorId = req.params.id;
  const doctorData = req.body;

  try {
    await Doctors.update(doctorData, {
      where: {
        id: doctorId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Artists update successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating artist",
      error: error.message,
    });
  }
};

doctorController.delete = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const deleteResult = await Doctors.destroy({
      where: {
        id: doctorId,
      },
    });

    if(deleteResult === 0) {
      res.status(404).json({
        success: true,
        message: "Artist not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Artists deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting artist",
      error: error.message,
    });
  }
};

module.exports = doctorController;
