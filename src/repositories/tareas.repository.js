const { pool } = require('../db');

class TareasRepository {
    async getAll( user_id ) {
        const result = await pool.query(
        'select id, nombre, categoria, fecha_finalizacion, hecha from tareas where user_id = $1 order by id desc;', [user_id]
        );
        return result.rows;
    }

    async getNoHechas( user_id ) {
        const result = await pool.query(
        'select id, nombre, categoria, fecha_finalizacion, hecha from tareas where user_id = $1 and hecha = false order by id desc;', [user_id]
        );
        return result.rows;
    }

    async getHechas( user_id ) {
        const result = await pool.query(
        'select id, nombre, categoria, fecha_finalizacion, hecha from tareas where user_id = $1 and hecha = true order by id desc;', [user_id]
        );
        return result.rows;
    }

    async getById( user_id, id ) {
        const result = await pool.query(
        'select id, nombre, categoria, fecha_finalizacion, hecha, created_at from tareas where user_id = $1 and id = $2;', [user_id, id]
        );
        return result.rows[0];
    }

    async create(nombre, categoria, fecha_finalizacion, user_id) {
        const result = await pool.query(
        'insert into tareas (nombre, categoria, fecha_finalizacion, hecha, user_id) values ($1,$2,$3,$4,$5) returning id, nombre, categoria, fecha_finalizacion, hecha, user_id;',[nombre, categoria, fecha_finalizacion, false, user_id] 
        );
        return result.rows[0];
    }

    async update(user_id, id, data) {
        const result = await pool.query(
            'update tareas set nombre = coalesce($1, nombre), categoria = coalesce($2, categoria), fecha_finalizacion = coalesce($3, fecha_finalizacion), hecha = coalesce($4, hecha) where id = $5 and user_id = $6 returning id, nombre, categoria, fecha_finalizacion, hecha',[data.nombre ?? null, data.categoria ?? null, data.fecha_finalizacion ?? null, data.hecha ?? null, id, user_id]  
        );
    return result.rows[0] || null;
    }

    async changeEstado(user_id, id, estado) {
        const result = await pool.query(
            'update tareas set hecha = $1 where id = $2 and user_id = $3 returning hecha',[ estado, id, user_id ]
        );
        return result.rows[0] || null;
    }

    async remove(user_id, id) {
        const result = await pool.query(
        'delete from tareas where user_id = $1 and id = $2 returning id', [user_id, id]
        );
        return result.rows[0] || null;
    }

}

module.exports = { TareasRepository };