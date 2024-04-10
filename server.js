const express = require('express');
const mysql = require('mysql');
const path = require("path");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

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

// Endpoint para obtener datos de la base de datos

app.get('/', async (req, res) => {
  res.render('formulario');
})

app.get('/datos', (req, res) => {
  connection.query('SELECT * FROM Reporte', (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al obtener los datos');
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
