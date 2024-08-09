"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     **/
    await queryInterface.bulkInsert(
      "appointments",
      [
        {
          id: 1,
          appointment_date: "2024-06-08",
          user_id: 2,
          service_id: 3,
          doctor_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          appointment_date: "2024-06-08",
          user_id: 3,
          service_id: 2,
          doctor_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          appointment_date: "2024-06-08",
          user_id: 4,
          service_id: 1,
          doctor_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          appointment_date: "2024-06-08",
          user_id: 5,
          service_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          appointment_date: "2024-06-09",
          user_id: 6,
          service_id: 1,
          doctor_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          appointment_date: "2024-06-09",
          user_id: 7,
          service_id: 2,
          doctor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     **/
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
