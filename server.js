const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  connectionLimit: 10, // Set your desired connection limit
  host: 'localhost',
  user: 'sa',
  password: 'Pekkavegano357%',
  database: 'ReportesWhirl',
  port: 3306
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

// Configurar el directorio de visitas
app.set('views', path.join(__dirname, 'views'));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Servir archivos estáticos desde el directorio 'public' si tienes archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para la página de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/PaginaInicio.html'));
});

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Endpoint para obtener datos de la base de datos
app.get('/datos', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión de la pool:', err);
      res.status(500).send('Error al obtener los datos');
      return;
    }
    connection.query('SELECT * FROM Reporte', (error, results, fields) => {
      connection.release(); // Release the connection back to the pool
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error al obtener los datos');
        return;
      }
      console.log('Resultado de la consulta:', results);
      res.json(results);
    });
  });
});

app.post('/datos', (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const nombreProducto = req.body.nombreProducto;
  const prioridad = parseInt(req.body.prioridad); // Convertir a entero
  const descripcion = req.body.descripcion;
  const latitude = req.body.latitude; // Obtener el valor de latitude
  const longitude = req.body.longitude; // Obtener el valor de longitude

  // Hacer algo con los datos, como enviarlos a una base de datos o responder con ellos
  console.log("Nombre:", nombreProducto);
  console.log("Entero:", prioridad);
  console.log("Texto:", descripcion);
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  // Responder con un mensaje de éxito
  res.send('Datos recibidos correctamente.');
});