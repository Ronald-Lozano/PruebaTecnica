import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mascostaSchema = new Schema({
    nombre: { type: String, require: [true, 'Nombre del conctacto obligatorio'] },
    apellido: String,
    correo: String,
    telefono: String,
    celular: { type: Number, require: [true, 'Celular del conctacto obligatorio'] },
    direccion: String,
    genero: String,
    date: { type: Date, default: Date.now },
    activo: { type: Boolean, default: true },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Referencia al modelo de usuario
    }
});

// convertir modelo
export default mongoose.model('primerBd', mascostaSchema);
