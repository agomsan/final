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
          service_name: "Catalog Insurance",
          description: "Select an option from out Insurance catalog",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          service_name: "Transform Existing Insurance",
          description:
            "We know that sometimes you want to change a Insurance for any reason, we can help you with that",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          service_name: "Balms and similar articles",
          description:
            "Some customers things a Insurance does not need any special treatment, but we know that is not true, we have the best products for you to protect your Insurances",
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
