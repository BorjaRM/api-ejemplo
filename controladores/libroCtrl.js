// http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html

/*var libros = [
  {
    "id": 0,
    "title": "El señor de los anillos",
    "autor": "J. R. R. Tolkien"
  },
  {
    "id": 1,
    "title": "Jim botron y lucas el maquinista",
    "autor": "Michael Ender"
  },
  {
    "id": 2,
    "title": "Juego de Tronos",
    "autor": "George R. Martin"
  }
]*/

var Libros = require('../modelos/libros')
var Sequelize = require('sequelize');

var _sequelize = new Sequelize('libros','root','123456',{
  host:'192.168.1.186',
  dialect:'mysql',
  pool: {
    max:5,
    min:0,
    idle:1000 //tiempo maximo de espera, si se supera se envia un error
  }
})

function libroCtrl(req, res, next) {
  // next sirve para poder continuar con las peticiones
  var _libros = new Libros(_sequelize); //El modelo vacio
  var libro = req.body;

  // Esta funcion se llama cuando utilizamos POST para añadir un nuevo libro
  this.addBook = function() {
    this.createBook = _libros.create({ //create es una función ya existente de sequelize. crea una instancia del modelo
      title : libro.title,
      autor : libro.autor
    }).then(function(){ // Se ha insertado el libro correctamente
      res.status(200).send();
    }).error(function(err){ // Se ha producido un error
      res.status(403).send();
    });
  };

  // Esta funcion se llama cuando utilizamos GET para obtener todos los libros
  this.getAll = function() {
    _libros.findAll().then(function(data){ //findAll rellena el modelo con la info de la base de datos
      res.status(200).jsonp(data); //Obtenemos todos los libros y los transformamos en un json
    });
  };

  this.getBookId = function() {
    var idLibro = req.params.id; //obtenemos el id del libro
    _libros.findById(idLibro)
      .then(function(data){ //then es una promesa que nos devueve el objeto
        res.status(200).jsonp(data); //devolvemos la información en formato json
      })
      .error(function(err){
        res.status(403).send(); //ha habido un fallo con la solicitud
      });
  };

  this.deleteBook = function() {
    var idLibro = req.params.id; //obtenemos el id del libro
    _libros.destroy({
      where : {id : idLibro }
    })
    .then(function() {
      res.status(204).send();
    })
    .error(function(err) {
      res.status(403).send();
    })
  };

  this.updateBookById = function() {
    var idLibro = req.params.id; //obtenemos el id del libro
    var libroModificado = req.body; // obtiene el libro modificado que nosotros mandamos

    _libros.findById(idLibro)
      .then(function(book){ //then es una promesa que nos devueve el objeto
        book.title = libroModificado.title;
        book.autor =  libroModificado.autor;
        book.save()
          .then(function(result){
            res.status(200).jsonp(book); //devolvemos la información en formato json
          })
      })
      .error(function(err){
        res.status(403).send(); //ha habido un fallo con la solicitud
      });
  }
}

module.exports = libroCtrl; // esto nos permite que se pueda exportar e importar desde otro fichero
