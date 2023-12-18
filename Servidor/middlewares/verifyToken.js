const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'PruebaTecnica', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = { id: decoded.userId };
        next();
    });
}

module.exports = verifyToken;

