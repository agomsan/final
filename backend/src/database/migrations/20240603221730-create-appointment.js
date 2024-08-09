"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      appointment_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model:"users",
          key:"id",
        }
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model:"services",
          key:"id",
        }
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model:"doctors",
          key:"id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("appointments");
  },
};