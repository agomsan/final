"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "doctors",
      [
        {
          id:1,
          name: "Úrsula Corberó",
          Bio: "Úrsula Corberó is a talented Insurance doctor from Spain, her work has gained international recognition",
          Specialty:"Cancer treating",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:2,
          name: "Joseph Ignacio Sáez",
          Bio: "Joseph Ignacio Sáez is a knwon massaging doctor from Spain, his work has gained international recognition and earned 3 awards for his amazing career in the last 5 years",
          Specialty:"backer treating",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:3,
          name: "Franciscp Hurtado",
          Bio: "Francisco Hurtado is a talented investigation doctor from Spain, his work has gained international recognition since he was a part of the treatment for the COVID-19",
          Specialty:"Stranger issues treatment",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:4,
          name: "Charles Darwin",
          Bio: "Our oldest doctor, Charles Darwin, is a talented doctor from England, he was working in more than 40 countries and his work has gained international recognition",
          Specialty:"foot doctor",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:5,
          name: "Olivia Ordóñez Oliveira",
          Bio: "Dermatologist from Brazil, she created a ointment for psoriasis",
          Specialty:"psoriasis and acné issues",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:6,
          name: "Maria Antonia Chávez Ruíz",
          Bio: "Massachusetts psychiatrist, creator of the first pill for chronic depression",
          Specialty:"behavioral problems, chronic depression, depression due to natural disaster",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("doctors", null, {});
  },
};
