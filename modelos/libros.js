var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Libros = sequelize.define('libros', {
    title:{
      type: Sequelize.STRING,
      field: 'title'
  },
    autor: {
      type: Sequelize.STRING,
      field: 'autor'
  }
  });
  return Libros;
}

/* sequelize nos obliga a utilizar los campos createAt y aupdatedAt, tenemos que añadirlos
en la base de datos */
