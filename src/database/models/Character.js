module.exports = function (sequelize, dataTypes) {
    let alias = "Character";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      age: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      history: {
        type: dataTypes.STRING(255),
        allowNull: false,
      }
    
    };
    let config = {
      tableName: "characters",
      timestamps: false,
    };
  
    const Character = sequelize.define(alias, cols, config);
  
    /* Associations */
    Character.associate = (models) => {
      Character.belongsToMany(models.Movie, {
        as: "movies",
        through: "character_movie",
        foreignKey: "character_id",
        otherKey: "movie_id",
        timestamps: false,
      });
    
    };
  
    return Character;
  };
  