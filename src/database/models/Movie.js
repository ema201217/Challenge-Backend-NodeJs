module.exports = function (sequelize, dataTypes) {
    let alias = "Movie";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      image: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      release_date: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      qualify: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      genre_id: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
    
    };
    let config = {
      tableName: "movies",
      timestamps: false,
    };
  
    const Movie = sequelize.define(alias, cols, config);
  
    /* Associations */
    Movie.associate = (models) => {
      Movie.belongsTo(models.Genre, {
        as: "genre",
        foreignKey: "genre_id",
      });
      Movie.belongsToMany(models.Character, {
        as: "characters",
        through: "character_movie",
        foreignKey: "movie_id",
        otherKey: "character_id",
        timestamps: false,
      }); 
    
    };
  
    return Movie;
  };
  