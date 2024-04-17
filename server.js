const path = require('path');
const bodyParser = require('body-parser');
const { Connection, Request, TYPES } = require('tedious');
const db = require('./conexion.js');



const config = {
    server: 'LAPTOP-6VJG77D3',
    authentication: {
        type: 'default',
        options: {
            userName: "tofu123",
            password: "tempura123@"
        }
    },
    options: {
        port: 1433,
        database: 'whirlpool',
        trustServerCertificate: true
    }
}

const connection=new Connection(config);

const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'PaginaInicio.html'));
});

app.get('/formulario', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

app.use(bodyParser.urlencoded({extended: false}));

app.post('/datos', function(req, res) {
    const sql = 'INSERT INTO Reporte (nombreProducto, prioridad, Descripcion, latitude, longitude) VALUES (@nombreProducto, @prioridad, @Descripcion, @latitude, @longitude)';
    const request = new Request(sql, function(error, rowCount) {
        if (error) {
            console.error(error);
            res.status(500).send('Hubo un error al insertar los datos en la base de datos');
        } else {
            res.send('Datos insertados correctamente');
        }
    });

    request.addParameter('nombreProducto', TYPES.VarChar, req.body.nombreProducto);
    request.addParameter('prioridad', TYPES.Int, req.body.prioridad);
    request.addParameter('Descripcion', TYPES.VarChar, req.body.Descripcion);
    request.addParameter('latitude', TYPES.VarChar, req.body.latitude);
    request.addParameter('longitude', TYPES.VarChar, req.body.longitude);

    db.execSql(request);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
