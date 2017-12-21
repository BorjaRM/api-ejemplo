// Cargamos las libreria express, body-parser, method-override
var express = require("express"); //enrutar y cargar servidor
var _app = express(); // Instanciamos un objeto
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

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

var libros = [
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
]

// Definimos que debe hacer cuando reciba una petición get
router.get('/books/', function(req,res){
  res.status(200).jsonp(libros);
});

// Devuelve el titulo de un libro
router.get('/books/title/:id', function(req,res){
  var id = req.params.id;
  res.status(200).jsonp(libros[id].title);
});

// Devuelve la información de un libro
router.get('/books/:id', function(req,res){
  var id = req.params.id;
  res.status(200).jsonp(libros[id]);
});

router.post('/books', function(req,res){
  var libro = req.body;
  libros.push(libro);
  res.status(200).jsonp(libros); //Le contestamos ok y devolvemos los libros
});

// Imprimimos el libro por consola pero no lo añadimos
/*router.post('/books', function(req,res){
  var libro = req.body;
  console.log(libro);
  res.status(200).send();
});*/

// MODIFICAR UN REGISTRO
router.put('/books/:id', function(req,res){
  var id_libro = req.params.id; // id del libro que queremos modificar
  var libro = req.body; // Obtiene el libro modificado que nosotros mandamos
  /* Si imprimimos directamente libro veremos "object", para ver su contenido,
      debemos utilizar la funcion JSON.stringify(object); */
  console.log("id ->" + id_libro + " libro " + JSON.stringify(libro));

  // Recorremos el array de libros para encontrar el libro que queremos modificar
  libros.forEach(function (elemento, indice, array) {
    if(indice == id_libro) {
      console.log("Localizado " + elemento.title + " --- " + libro.title);
      elemento.title = libro.title;
      elemento.autor = libro.autor;
    }
  })
  res.status(200).jsonp(libros); //Le contestamos ok y devolvemos los libros
  // Podemos acceder directamente al libro desde el array
  // console.log(libros[id_libro]);
});

router.delete('/books/:id', function(req,res){
  // Como la posición coincide con el id, podemos utilizarlo directamente en la funcion slice;
  libros.splice(req.params.id,1);
  res.status(200).jsonp(libros); //Le contestamos ok y devolvemos los libros
});
