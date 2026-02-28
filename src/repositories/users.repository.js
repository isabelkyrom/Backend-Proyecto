const { pool } = require('../db');

class UsersRepository {

    async create( name, email, passwordHash) {
        const nuevo = await pool.query(
            'insert into usuarios (nombre, email, password_hash, role) values ($1,$2,$3,$4) returning nombre, email, role;',[name, email, passwordHash, 'usuario']
        );
        return nuevo.rows[0];
    }

    async getById(id) {
        const result = await pool.query(
        'select nombre, email, role from usuarios where id = $1;', [id]
        );
        return result.rows[0];
    }

    async getByEmail(email) {
        const res = await pool.query('select id, nombre, email, role, password_hash from usuarios where email = $1', [email]);
        return res.rows[0] || null;
    };

    // Función solo para el admin
    async getUsers() {
        const res = await pool.query('select id, nombre, email, role from usuarios');
        return res.rows || null;
    }

}

module.exports = { UsersRepository }