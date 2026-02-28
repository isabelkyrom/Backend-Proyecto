const bcrypt = require('bcryptjs')
const { UsersRepository } = require('../repositories/users.repository');
const { sign } = require('../auth')
const { validarCuenta } = require('../domain/users.rules')

const repo = new UsersRepository;

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await repo.getByEmail(email);

    if ( !user ) {
        return res.status(401).json({ error : 'Credenciales incorrectas'});
    }

    const ok = await bcrypt.compare(password, user.password_hash);

    if ( !ok ) {
        return res.status(401).json({ error: 'Credenciales incorrectas'});
    }

    const token = sign({
        id: user.id,
        email: user.email,
        role: user.role
    });


    return res.json({ token })
}

async function create(req, res) {
    const { nombre, email, password } = req.body;

    const data = await validarCuenta({ nombre, email, password });

    const existe = await repo.getByEmail(email);

    if (existe) {
        return res.status(409).json({ error: 'El email ya está registrado' });
    }

    if( !data.ok ) {
        return res.status(400).json(data.data.error);
    }

    const passwordHash = await bcrypt.hash( data.data.password, 10 );
    
    const nuevo = await repo.create(data.data.nombre, data.data.email, passwordHash);

    return res.status(201).json(nuevo);
}

async function getMe(req, res) {
    const user = await repo.getById(req.user.id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json(user);
}

async function getUsers(req, res) {
    const users = await repo.getUsers();

    if ( !users ) {
        return res.status(404).json({ error: 'Usuarios no encontrado' });
    }
    return res.json( users );
}

module.exports = { create, loginUser, getMe, getUsers }