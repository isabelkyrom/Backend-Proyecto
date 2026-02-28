const { TareasRepository } = require('../repositories/tareas.repository');
const { validarTarea, validarMod } = require('../domain/tareas.rules');
const repo = new TareasRepository

// GETs
async function getAll(req, res) {
    const user_id = req.user.id;

    const tareas = await repo.getAll(user_id);

    return res.json(tareas)
}
async function getNoHechas(req, res) {
    const user_id = req.user.id;
    const tareas = await repo.getNoHechas( user_id );
    return res.json(tareas)
}
async function getHechas(req, res) {
    const user_id = req.user.id;
    const tareas = await repo.getHechas( user_id );
    return res.json(tareas)
}
async function getById(req, res) {
    const id = Number(req.params.id)
    const user_id = req.user.id;
    const tarea = await repo.getById( user_id, id );

    if ( !tarea ) {
        return res.status(404).json({ error: 'Tarea no encontrada' })
    }

    return res.json(tarea)
}

// Create
async function create(req, res) {
    const { nombre, categoria, fecha_finalizacion } = req.body;
    const user_id = req.user.id
    const data = validarTarea({ nombre, categoria, fecha_finalizacion });

    if( data.error ) {
        return res.status(400).json(data.error);
    }

    const nuevo = await repo.create( data.data.nombre, data.data.categoria, data.data.fecha_finalizacion, user_id );

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

    if ( anterior.hecha === true ) {
        return res.status(400).json({ error: 'No puede modificar una tarea completada' });
    };

    const fechaCreacion = anterior.created_at;
    const { nombre, categoria, fecha_finalizacion, hecha } = req.body;
    const payload = {
        nombre: nombre !== undefined ? nombre: undefined,
        categoria: categoria !== undefined ? categoria: undefined,
        fecha_finalizacion: fecha_finalizacion !== undefined ? fecha_finalizacion: undefined,
        fechaCreacion,
        hecha: hecha !== undefined ? hecha: undefined
    };

    const validacion = validarMod( payload );
    console.log(validacion.data)
    
    if( validacion.error ) {
        return res.status(400).json(validacion.error);
    }

    const nuevo = await repo.update( user_id, id, validacion.data );

    return res.status(200).json(nuevo);
};

async function changeEstado(req, res) {
    const id = Number(req.params.id);
    const user_id = req.user.id;
    const estado = req.params.hecha;
    const tarea = await repo.getById( user_id, id );

    if ( !tarea ) return res.status(404).json({error: 'No encontrado'});

    const cambio = await repo.changeEstado( user_id, id, estado )

    return res.status(200).json(cambio);
}

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


module.exports = { getAll, getNoHechas, getHechas, getById, create, update, changeEstado, remove };