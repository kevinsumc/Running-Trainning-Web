var mysql = require('mysql');
var express = require('express');

var app = express();
var port = 5500;

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'registro_training',
    user: 'root',
    password: ''
});

conexion.connect(function (error) {
    if (error) {
        console.error('Error en la conexión: ' + error.message);
        throw error;
    } else {
        console.log('CONEXION EXITOSA');
    }
});

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    // Puedes realizar operaciones en la base de datos aquí
    //MOSTRAR TABLA 
    conexion.query('SELECT * FROM entrenmientos ', function (error, filas) {
        if (error) {
            throw error;
        } else {
            filas.forEach(fila => {
                console.log(fila);
            });
            res.send('Datos mostrados en la consola. Verifica la consola para más detalles.');
        }
    });
});

app.post('/registrar', function(req, res) {
    // Obtener datos del formulario
    var tipos_entrenamiento = req.body.tipos_entrenamiento;
    var km_totales = req.body.km_totales;
    var dia_trainning = req.body.dia_trainning;
    var sensaciones_trainning = req.body.sensaciones_trainning;
    var horario_trainning = req.body.horario_trainning;
    var tiempo_trainning = req.body.tiempo_trainning;

    // Realizar la inserción en la base de datos
    var query = 'INSERT INTO entrenmientos (tipo_entrenamiento, km_totales, dia_entrenamiento, sensaciones, horario, tiempo) VALUES (?, ?, ?, ?, ?, ?)';

    conexion.query(query, [tipos_entrenamiento, km_totales, dia_trainning, sensaciones_trainning, horario_trainning, tiempo_trainning], function(error, result) {
        if (error) {
            console.error('Error al insertar en la base de datos: ' + error.message);
            res.send('Error al registrar el entrenamiento');
        } else {
            console.log('Entrenamiento registrado correctamente');
            res.send('Entrenamiento registrado correctamente');
        }
    });
});

app.listen(port, function() {
    console.log('Servidor escuchando en http://localhost:' + port);
});
