import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

// Exporta el modelo directamente, sin asignarlo a una variable
export default mongoose.model('User', userSchema);

