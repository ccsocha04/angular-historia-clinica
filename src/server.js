
const express = require('express');
const cors = require('cors')
const path = require('path');

// Crear servidor express
const app = express();

// Configurar CORS
app.use( cors() )

// Rutas
app.use( express.static(__dirname + '/dist/ng-blog') );
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/ng-blog/index.html'));
});

// Puerto de escucha
app.listen( process.env.PORT || 8080, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});
