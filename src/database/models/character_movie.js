module.exports = function (sequelize, dataTypes) {
    let alias = "character_movie";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      character_id: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      movie_id: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      }
    
    };
    let config = {
      tableName: "character_movie",
      timestamps: false,
    };
  
    const character_movie = sequelize.define(alias, cols, config);
  
    return character_movie;
  };
  