"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Longlive extends Model {
    static associate(models) {
      Longlive.belongsTo(models.User, {
        foreignKey: "authorId",
      });
    }
  }
  Longlive.init(
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
      modelName: "Longlive",
    }
  );
  return Longlive;
};
