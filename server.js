const express = require('express');

// Crear servidor express
const app = express();

// Puerto de escucha
app.listen( 3001, () => {
    console.log('Servidor corriendo en el puerto ' + 3001);
});
