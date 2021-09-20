const express = require('express');

// Crear servidor express
const app = express();

app.use(express.static(__dirname+'/dist/angular-historia-clinica'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/angular-historia-clinica/'));
});

// Puerto de escucha
app.listen( 8080, () => {
    console.log('Servidor corriendo en el puerto ' + 8080);
});