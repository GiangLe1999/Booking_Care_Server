"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Client_Specialty extends Model {
    static associate(models) {}
  }
  Doctor_Client_Specialty.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Client_Specialty",
    }
  );
  return Doctor_Client_Specialty;
};
