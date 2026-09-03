const { sequelize, DataTypes } = require('./index');

const Movie = sequelize.define('Movie', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  thumbnailUrl: { type: DataTypes.STRING },
  videoUrl: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING }
});

module.exports = Movie;
