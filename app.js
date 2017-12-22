// Cargamos las libreria express, body-parser, method-override
var express = require("express"); //enrutar y cargar servidor
var _app = express(); // Instanciamos un objeto
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var libroCtrl = require("./controladores/libroCtrl");

// Indicamos al objeto _app que utilice estas librerias
_app.use(bodyParser.urlencoded({extended: false}));
_app.use(bodyParser.json());
_app.use(methodOverride());

var router = express.Router(); //lee las peticiones del navegador y las trata con express
_app.use(router);

// Indicamos el puerto de escucha para nuestro servidor
_app.listen(3000, function() {
  console.log("Servidor creado");
});

// PETICIONES GET
// Devuelve todos los libros
router.get('/books/', function(req,res,next){
  var _librosCtrl = new libroCtrl(req,res,next);
  _librosCtrl.getAll();
});

// Devuelve un libro por su id
router.get('/books/:id', function(req,res,next){
  var _librosCtrl = new libroCtrl(req,res,next);
  _librosCtrl.getBookId();
});

// PETICIONES POST
// Añade un libro
router.post('/books', function(req,res,next){
  var _librosCtrl = new libroCtrl(req,res,next);
  _librosCtrl.addBook();
});

// PETICIONES DELETE
// Eliminar un libro
router.delete('/books/:id', function(req,res,next){
  var _librosCtrl = new libroCtrl(req,res,next);
  _librosCtrl.deleteBook();
});

// PETICIONES PUT
// Modificar un libro
router.put('/books/:id',function(req,res,next){
  var _librosCtrl = new libroCtrl(req,res,next);
  _librosCtrl.updateBookById();
});
