"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "services",
      [
        {
          id: 1,
          service_name: "Personalized Tattoo",
          description: "Create with our doctor an unique tattoo only for you",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          service_name: "Catalog Tattoo",
          description: "Select an option from out tattoo catalog",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          service_name: "Transform Existing tattoo",
          description:
            "We know that sometimes you want to change a tattoo for any reason, we can help you with that",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          service_name: "Balms and similar articles",
          description:
            "Some customers things a tattoo does not need any special treatment, but we know that is not true, we have the best products for you to protect your tattoos",
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
