const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sa',
  password: 'Pekkavegano357%',
  database: 'ReportesWhirl'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida correctamente.');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/PaginaInicio.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use((err, req, res, next) => {
console.error('Error:', err);
res.status(500).send('Ocurrió un error en el servidor');
});

// Endpoint para obtener datos de la base de datos

app.get('/', async (req, res) => {
  res.render('formulario');
});
app.get('/datos', (req, res) => {
  connection.query('SELECT * FROM Reporte', (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al obtener los datos');
      return;
    }
    console.log('Resultado de la consulta:', results);
    res.json(results);
  });
});

// Endpoint para insertar datos en la base de datos
app.post('/datos', (req, res) => {
  const nuevoReporte = req.body;

  // Insertar en la base de datos
  connection.query('INSERT INTO Reporte SET ?', nuevoReporte, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send({error: 'Error al insertar nuevo reporte' });
      return;
    }
    console.log('Nuevo reporte insertado correctamente:', results);
    res.status(201).json({ message: 'Nuevo reporte insertado correctamente', reporte: nuevoReporte});
  });
});



// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servidor backend escuchando en el puerto ${PORT}');
});

console.log(app._router.stack);

// Configurar el directorio de visitas
app.set('views', path.join(__dirname, 'views'));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');