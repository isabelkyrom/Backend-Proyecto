const { EventosRepository } = require('../repositories/eventos.repository');
const { validarEvento } = require('../domain/eventos.rules')
const repo = new EventosRepository

// GETs
async function getAll(req, res) {
    const user_id = req.user.id;

    const eventos = await repo.getAll(user_id);

    return res.json(eventos)
}

async function getById(req, res) {
    const id = Number(req.params.id);
    const user_id = req.user.id;
    const evento = await repo.getById(user_id, id);

    if ( !evento ) {
        return res.status(404).json({ error: 'Evento no encontrada' })
    }

    return res.json(evento)
}

// Create
async function create(req, res) {
    const { nombre, fecha_inicio, fecha_finalizacion } = req.body;
    const user_id = req.user.id
    const data = validarEvento({ nombre, fecha_inicio, fecha_finalizacion });

    if( data.error ) {
        return res.status(400).json(data.error);
    }

    const nuevo = await repo.create( user_id, data.data.nombre, data.data.fecha_inicio, data.data.fecha_finalizacion );

    return res.status(201).json(nuevo);
}

// Update
async function update(req, res) {
    
    const id = Number(req.params.id);
    const user_id = req.user.id;
    const anterior = await repo.getById( user_id, id );

    if ( !anterior ) {
        return res.status(404).json({error: 'No encontrado'});
    };

    const { nombre, fecha_inicio, fecha_finalizacion } = req.body;
    const payload = {
        nombre: nombre !== undefined ? nombre: undefined,
        fecha_inicio: fecha_inicio !== undefined ? fecha_inicio: undefined,
        fecha_finalizacion: fecha_finalizacion !== undefined ? fecha_finalizacion: undefined
    };

    const validacion = validarEvento( payload );
    
    if( validacion.error ) {
        return res.status(400).json(validacion.error);
    }

    const nuevo = await repo.update( user_id, id, validacion.data );

    return res.status(200).json(nuevo);
};

// Delete
async function remove(req, res) {
    const id = Number(req.params.id);
    const user_id = req.user.id;

    const ok = await repo.remove( user_id,id );

    if ( !ok ) {
        return res.status(404).json({ error: 'No encontrado' });
    }

    return res.status(204).send();
}

module.exports = { getAll, getById, create, update, remove };