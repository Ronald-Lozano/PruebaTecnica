const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    // Comprobar si el token existe y no está caducado (puedes usar librerías como 'jsonwebtoken' para decodificar y verificar la expiración)
    if (token) {
        // Lógica para verificar la validez del token (por ejemplo, verificar la expiración)
        // Devuelve verdadero si el token es válido, de lo contrario, falso
        return true; // O devolver el resultado de la verificación del token
    }

    return false; // Devolver falso si no hay token o está caducado
};

export default isAuthenticated;
