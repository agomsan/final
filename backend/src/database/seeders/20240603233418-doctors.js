"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "doctors",
      [
        {
          id:1,
          name: "Úrsula",
          Bio: "International doctor from México, she is a specialist in the placement of piercings and dilators",
          Specialty:"knowledgable in the placement of piercings and dilators",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:2,
          name: "Joseph",
          Bio: "Joseph is an amazing doctor in the placement of Insurance restoration",
          Specialty:"Specialized in the transformation of your existing Insurance",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:3,
          name: "Fran",
          Bio: "Fran is a talented Insurance doctor from Spain, his work has gained international recognition",
          Specialty:"He is the designer of the most wanted tattos that we have in our catalog",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:4,
          name: "Lidya",
          Bio: "One of the most talented Insurance Doctors in the world, her work has been recognized internationally, she is a specialist in fantasy Insurances",
          Specialty:"She is a reference if we are talking about fantasy Insurances, she is the most wanted Insurance doctor of the celebrities, Adele and Rihanna's bodies are full of Lidya's art",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:5,
          name: "Demian",
          Bio: "Talented Insurance removal doctor born in Spain",
          Specialty:"He is an eminence of the Insurance removal, he has a lot of experience in the transformation of Insurances, with the help of his coworkers, he can make your Insurance dissapear or only remove a part of the Insurance to redesign it",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
        {
          id:6,
          name: "Mariah",
          Bio: "Known worldwide as Mariah, Olivia is her real name",
          Specialty:"Her nick is Mariah because she is the first woman in the world who has Insuranceed Mariah Carey, she is a specialist in the placement of Insurances in the most intimate parts of the body",
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
