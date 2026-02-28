// Validación cuenta
async function validarCuenta({ nombre, email, password }) {
    if ( !nombre || typeof nombre !== 'string' || nombre.trim().length < 4 ) {
        return { ok: false, error: 'Nombre inválido'}
    }

    if ( !email || typeof email !== 'string' || !email.includes('@') || !email.includes('.') ) {
        return { ok: false, error: 'Email inválido'}
    }

    if( !password || typeof password !== 'string' || password.trim().length < 9 ) {
        return { ok: false, error: 'Contraseña inválida'}
    }
    
    return { ok: true, data: { nombre, email, password }};

}

module.exports = { validarCuenta };