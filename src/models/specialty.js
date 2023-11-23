"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {}
  }
  Specialty.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      image: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );
  return Specialty;
};
