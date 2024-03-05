const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registro_training'
});

conexion.connect((error) => {
    if (error) {
        console.error('Error en la conexión: ' + error.message);
        throw error;
    } else {
        console.log('CONEXION EXITOSA');
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Crea una carpeta 'public' para tus archivos estáticos (CSS, imágenes, etc.)

app.get('/', (req, res) => {
    // Puedes enviar aquí tu página HTML con el formulario
    res.sendFile(__dirname + '/index.html');
});

app.post('/registrar', (req, res) => {
    const { tipos_entrenamiento, km_totales, dia_trainning, sensaciones_trainning, horario_trainning, tiempo_trainning } = req.body;

    const query = `INSERT INTO entrenamientos (tipo_entrenamiento, km_totales, dia_entrenamiento, sensaciones, horario, tiempo) VALUES (?, ?, ?, ?, ?, ?)`;

    conexion.query(query, [tipos_entrenamiento, km_totales, dia_trainning, sensaciones_trainning, horario_trainning, tiempo_trainning], (error, result) => {
        if (error) {
            console.error('Error al insertar en la base de datos: ' + error.message);
            res.send('Error al registrar el entrenamiento');
        } else {
            console.log('Entrenamiento registrado correctamente');
            res.send('Entrenamiento registrado correctamente');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
