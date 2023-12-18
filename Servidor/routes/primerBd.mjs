import express from 'express';
const router = express.Router();
const UserController = require('../controllers/UserController');
const verifyToken = require('../middlewares/verifyToken'); // Importa el middleware de autenticación
var mongoose = require('mongoose');

//importa el modelo nota
import primerBd from "../models/primerBd";

//Agregar una registro

router.post('/nuevo-registro', verifyToken, async (req, res) => {
    const body = req.body;
    try {
        // Agregar el ID del usuario al campo 'usuario' del nuevo contracto
        body.usuario = req.user.id; // Asignar el ID del usuario actaul al contacto

        const nuevoContacto = await primerBd.create(body);
        res.status(200).json(nuevoContacto);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio algo inesperado',
            error
        })
    }
});

//Get busca todos los registros

router.get('/buscarTodo', verifyToken, async (req, res) => {
    try {
        // Agregar el ID del usuario al campo 'usuario' del nuevo contracto
        const usr = new mongoose.Types.ObjectId(req.user.id); // Asignar el ID del usuario actaul al contacto
        const primerDB = await primerBd.find({ usuario: usr });
        res.json(primerDB);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Error en la busqueda',
            error
        })
    }
});

//Get con Parametros

router.get('/buscarParametro/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const primerDB = await primerBd.findOne({ _id });
        res.json(primerDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en la busqueda de parametros',
            error
        })
    }
});

//Delete eliminar contacto

router.delete('/eliminarParametro/:id', verifyToken, async (req, res) => {
    const contactId = req.params.id;
    const userId = req.user.id;

    try {
        const contactoAEliminar = await primerBd.findByIdAndDelete({ _id: contactId, usuario: userId });

        if (!contactoAEliminar) {
            return res.status(400).json({
                mensaje: 'No se encontró el contacto o no tienes permiso para eliminarlo',
            });
        }
        res.json(contactoAEliminar);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en la eliminacion de parametros',
            error
        })
    }
});

// Actualizar contacto

router.put('/actualizar/:id', verifyToken, async (req, res) => {
    const contactId = req.params.id;
    const userId = req.user.id;
    const body = req.body;
    try {
        const contactoActualizado = await primerBd.findByIdAndUpdate(
            { _id: contactId, usuario: userId },
            body,
            { new: true }
        );
        if (!contactoActualizado) {
            return res.status(400).json({
                mensaje: 'No se encontró el contacto o no tienes permiso para actualizarlo',
            });
        }
        res.json(contactoActualizado);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en la actualizacion de parametros',
            error
        })
    }
});

// Rutas para registro y login
router.post('/register', UserController.register);
router.post('/login', UserController.login);


//exportar la configuracion del express

module.exports = router;