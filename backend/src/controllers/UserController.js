const userController = {};
const appointment = require("../models/appointment");
const { User, Appointment, Service, Doctors, Role } = require("../models/index");
const bcrypt = require("bcrypt");

userController.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

userController.getById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

userController.update = async (req, res) => {
  const userId = req.params.id;
  const { password, role_id, ...restUserData } = req.body;

  try {
    const userToUpdate = await User.findByPk(userId);

    if (!userToUpdate) {
      res.status(404).json({
        success: true,
        message: "User not found",
      });
      return;
    }

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      userToUpdate.password = hashedPassword;
    }

    userToUpdate.set({
      ...userToUpdate,
      ...restUserData,
    });

    await userToUpdate.save();

    res.status(200).json({
      success: true,
      message: "User update successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Users",
      error: error.message,
    });
  }
};

userController.delete = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteResult = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (deleteResult === 0) {
      res.status(404).json({
        success: true,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting User",
      error: error.message,
    });
  }
};

userController.getAppointmentsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Appointment,
          as: "appointments",
          include: [
            {
              model: Service,
              as: "service",
            },
          ],
          include: [
            {
              model: Doctors,
              as: "doctor",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],

          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "user_id",
              "service_id",
              "doctor_id",
            ],
          },
        },
      ],
    });

    if (!user) {
      res.status(404).json({
        success: true,
        message: "User not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "user appointment retrieved successfully",
      data: user.appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users Appointment",
      error: error.message,
    });
  }
};

userController.getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email query parameter is required" });
    }

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Appointment,
          as: "appointments",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "user_id",
              "service_id",
              "doctor_id",
            ],
          },
          include: [
            {
              model: Service,
              as: "service",
            },
          ],
          include: [
            {
              model: Doctors,
              as: "doctor",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "role_id"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    res.status(200).json({
      success: true,
      message: "Email retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving Email",
      error: error.message,
    });
  }
};

userController.getUserAppointments = async (req, res) => {
  try {
    const userId = req.tokenData.userId;

    const appointments = await Appointment.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Service,
          as: "service",
          attributes: {
            exclude: ["createdAt", "updatedAt", "service_id", "description"],
          },
        },
        {
          model: Doctors,
          as: "doctor",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "service_id",
              "doctor_id",
              "Bio",
              "Specialty",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "service_id", "doctor_id"],
      },
    });

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving Appointments",
      error: error.message,
    });
  }
};

userController.getUserProfile = async (req, res) => {
  const userId = req.tokenData.userId;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      include: {
        model: Role,
        as: 'role',
        attributes: ['name']
      }
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

userController.updateUserProfile = async (req, res) => {
  const userId = req.tokenData.userId;
  const { password, role_id, ...restUserData } = req.body;

  try {
    const userToUpdate = await User.findByPk(userId);

    

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      userToUpdate.password = hashedPassword;
    }

    userToUpdate.set({
      ...userToUpdate,
      ...restUserData,
    });

    await userToUpdate.save();

    res.status(200).json({
      success: true,
      message: "User update successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Users",
      error: error.message,
    });
  }
};

module.exports = userController;
