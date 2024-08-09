const serviceController = {};
const { Service } = require("../models/index");

serviceController.create = async (req, res) => {
  const { service_name, description } = req.body;

  try {
    if (!service_name || !description) {
      res.status(400).json({
        success: true,
        message: "Invalid Information",
      });
      return;
    }
    await Service.create({
      service_name,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Services created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating service",
      error: error.message,
    });
  }
};

serviceController.getAll = async (req, res) => {
  try {
    const services = await Service.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({
      success: true,
      message: "Services retreived successfully",
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retreived service",
      error: error.message,
    });
  }
};

serviceController.getById = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const service = await Service.findByPk(serviceId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!service) {
      return res.status(404).json({
        success: true,
        message: "Service not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retreived service",
      error: error.message,
    });
  }
};

serviceController.update = async (req, res) => {
  const serviceId = req.params.id;
  const serviceData = req.body;

  try {
    await Service.update(serviceData, {
      where: {
        id: serviceId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Services update successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating service",
      error: error.message,
    });
  }
};

serviceController.delete = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const deleteResult = await Service.destroy({
      where: {
        id: serviceId,
      },
    });

    if (deleteResult === 0) {
      res.status(404).json({
        success: true,
        message: "Service not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Services deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting service",
      error: error.message,
    });
  }
};

module.exports = serviceController;
