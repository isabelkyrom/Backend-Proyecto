const { pool } = require('../db');

class EventosRepository {
    async getAll( user_id ) {
        const result = await pool.query(
        'select id, nombre, fecha_inicio, fecha_finalizacion from eventos where user_id = $1 order by id desc;', [user_id]
        );
        return result.rows;
    }

    async getById( user_id, id ) {
        const result = await pool.query(
        'select id, nombre, fecha_inicio, fecha_finalizacion from eventos where id = $1 and user_id = $2;', [id, user_id]
        );
        return result.rows[0];
    }

    async create( user_id, nombre, fecha_inicio, fecha_finalizacion ) {
        const result = await pool.query(
        'insert into eventos (nombre, fecha_inicio, fecha_finalizacion, user_id) values ($1,$2,$3,$4) returning id, nombre, fecha_inicio, fecha_finalizacion, user_id;',[nombre, fecha_inicio, fecha_finalizacion, user_id]
        );
        return result.rows[0];
    }

    async update( user_id, id, data ) {
        const result = await pool.query(
            'update eventos set nombre = coalesce($1, nombre), fecha_inicio = coalesce($2, fecha_inicio), fecha_finalizacion = coalesce($3, fecha_finalizacion) where user_id = $4 and id = $5 returning id, nombre, fecha_inicio, fecha_finalizacion',[data.nombre ?? null, data.fecha_inicio ?? null, data.fecha_finalizacion ?? null, user_id, id]  
        );
    return result.rows[0] || null;
    }

    async remove( user_id, id ) {
        const result = await pool.query(
        'delete from eventos where user_id = $1 and id = $2 returning id', [user_id, id]
        );
        return result.rows[0] || null;
    }

}

module.exports = { EventosRepository };