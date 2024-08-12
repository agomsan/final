"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "services",
      [
        {
          id: 1,
          service_name: "Personalized Insurance",
          description: "Create with our doctor an unique Insurance only for you",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          service_name: "Skin issues",
          description: "Select an treatment for your skin for free",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          service_name: "Foot issues",
          description:
            "We can help you for make your foot look and work perfectly again",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          service_name: "Lactose intolerance solutions",
          description:
            "With our help included in our insurance anual suscription we can help you to solve your lactose intolerance",
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
    await queryInterface.bulkDelete("services", null, {});
  },
};
