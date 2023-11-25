"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Handbook extends Model {
    static associate(models) {
      Handbook.belongsTo(models.User, {
        foreignKey: "authorId",
      });
    }
  }
  Handbook.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      content: DataTypes.TEXT("long"),
      thumbnail: DataTypes.BLOB,
      description: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Handbook",
    }
  );
  return Handbook;
};
