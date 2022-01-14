module.exports = function (sequelize, dataTypes) {
    let alias = "User";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING(255),
      },
      pass: {
        type: dataTypes.STRING(255),
      }    
    };
    let config = {
      tableName: "users",
      timestamps: false,
    };
  
    const User = sequelize.define(alias, cols, config);
  
    return User;
  };
  