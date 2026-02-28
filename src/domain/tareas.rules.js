// ---- Creación de tareas
// Validación de datos
function validarTarea ({ nombre, categoria, fecha_finalizacion }) {

    // validación nombre
    if ( !nombre || typeof nombre !== 'string' || nombre.trim().length < 4) {
        return {ok: false, error: 'Nombre inválido'};
    };

    // validación categoría
    if ( !categoria || typeof categoria !== 'string' ) {
        return { ok: false, error: 'Categoría nnválida'};
    };

    // validacion fecha
    const ahora = new Date();
    const fecha = new Date(fecha_finalizacion + "T00:00:00");
    ahora.setHours(0, 0, 0, 0);
    fecha.setHours(0, 0, 0, 0);
    if ( isNaN(fecha.getTime()) || fecha < ahora) {
        return {ok: false, error: 'Fecha inválida'};
    };

    return { ok: true, data: { nombre, categoria, fecha_finalizacion: fecha }};
};

// Modificación
// Validación de datos
function validarMod({ nombre, categoria, fecha_finalizacion, fechaCreacion, hecha }) {

    // Validación Nombre
    if ( nombre !== undefined ) {
        if ( typeof nombre !== 'string' || nombre.trim().length < 4 ) return {ok: false, error: 'Nombre inválido'};
    };

    // Validación Categoría
    if ( categoria !== undefined ) {
        if ( typeof categoria !== 'string' ) return {ok: false, error: 'Categoría inválido'};
    };

    // Validación fecha
    let fechaMod;
    if ( fecha_finalizacion !== undefined ) {
        const fechaLimite = new Date(fechaCreacion + "T00:00:00")
        const fecha = new Date(fecha_finalizacion + "T00:00:00")
        fechaLimite.setHours(0, 0, 0, 0)
        fecha.setHours(0, 0, 0, 0)
        if ( isNaN(fecha.getTime()) || fecha < fechaLimite) {
            return {ok: false, error: 'Fecha inválida'}
        };

        fechaMod = fecha;
    };
   

    return { ok: true, data: { nombre, categoria, fecha_finalizacion: fechaMod, hecha }};
};

module.exports = { validarTarea, validarMod };