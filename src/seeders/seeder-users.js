module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "legiangbmt09@gmail.com",
        password: "123456",
        firstName: "Le",
        lastName: "Giang",
        address: "Viet Name",
        gender: 1,
        roleId: "R1",
        phoneNumber: "0962334807",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {},
};
