'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // appointment{n}---{1}user
      Appointment.belongsTo(models.User, {
        as: 'user',
        foreignKey: "user_id",
      });
      // appointment{n}---{1}service
      Appointment.belongsTo(models.Service, {
        as: 'service',
        foreignKey: "service_id",
      });
      // appointment{n}---{1}artist
      Appointment.belongsTo(models.Doctors, {
        as: 'doctor',
        foreignKey: "doctor_id",
      });


    }
  }
  Appointment.init({
    appointment_date: DataTypes.DATE,
    user_id:DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments'
  });
  return Appointment;
};