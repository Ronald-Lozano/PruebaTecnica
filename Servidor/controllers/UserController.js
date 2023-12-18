import User from '../models/UsersSchema'; // Verifica que la ruta sea correcta
const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';

const UserController = {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            // Si las credenciales son válidas, genera un token y devuélvelo en la respuesta
            const token = generateToken(newUser._id);
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al registrar usuario', error });
        }
    },


    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }

            // Generar token JWT aquí y devolverlo en la respuesta

            const token = generateToken(user._id);
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    },
};

function generateToken(userId) {
    // Define la información del token (puedes agregar más información si lo necesitas)
    const tokenData = {
        userId,
    };

    // Configura la firma y opciones del token (incluyendo la expiración)
    const tokenOptions = {
        expiresIn: '1h', // Tiempo de vencimiento del token (por ejemplo, 1 hora)
    };

    // Genera el token usando la librería jsonwebtoken y lo devuelve
    return jwt.sign(tokenData, 'PruebaTecnica', tokenOptions);
}

module.exports = UserController;
