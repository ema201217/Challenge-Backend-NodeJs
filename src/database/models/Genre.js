module.exports = function (sequelize, dataTypes) {
    let alias = "Genre";
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
      image: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
    };
    let config = {
      tableName: "genres",
      timestamps: false,
    };
  
    const Genre = sequelize.define(alias, cols, config);
  
    /* Associations */
    Genre.associate = (models) => {
     Genre.hasMany(models.Movie, {
        as: "movies",
        foreignKey: "genre_id",
      });
   /*     Genre.hasMany(models.Image, {
        as: "images",
        foreignKey: "GenreId",
      });
      Genre.belongsToMany(models.Size, {
        as: "sizes",
        through: "Genre_size",
        foreignKey: "GenreId",
        otherKey: "sizeId",
        timestamps: false,
      }); */
    
    };
  
    return Genre;
  };
  