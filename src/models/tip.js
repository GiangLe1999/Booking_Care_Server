"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tip extends Model {
    static associate(models) {
      Tip.belongsTo(models.User, {
        foreignKey: "authorId",
      });
    }
  }
  Tip.init(
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
      modelName: "Tip",
    }
  );
  return Tip;
};
