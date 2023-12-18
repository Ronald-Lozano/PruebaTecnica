import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join } from 'path';
import { static as staticFiles } from 'express'; // Cambié el nombre a 'staticFiles'
import mongoose from 'mongoose'; // Agregué la importación de Mongoose
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conexión a la base de datos
const url = 'mongodb://root:root@localhost:27018/employees?authSource=admin'; // Modificada la URL
mongoose.connect(url)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });

//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

//rutas
//app.get('/', function (req, res) {
//    res.send('Hola mundo')
//});

//middeleware para vue.js
app.use('/api', require('./routes/primerBd.mjs'))
import history from 'connect-history-api-fallback';
app.use(history());
app.use(staticFiles(join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
    console.log('Escuchando el puerto' + app.get('puerto'));
});