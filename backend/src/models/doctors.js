"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Doctors {1}---{n} appointment
      Doctors.hasMany(models.Appointment, {
        as: 'appointments',
        foreignKey: "doctor_id",
      });
    }
  }
  Doctors.init(
    {
      name: DataTypes.STRING,
      Bio: DataTypes.TEXT,
      Specialty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctors",
      tableName: "doctors"
    }
  );
  return Doctors;
};
