// Eventos
// Validacion eventos
function validarEvento ({ nombre, fecha_inicio, fecha_finalizacion }) {

    // validación nombre
    if( nombre !== undefined) {
        if (typeof nombre !== 'string' || nombre.trim().length < 4) {
            return {ok: false, error: 'Nombre inválido'};
        };
    }
    
    // validacion fechas
    let fecha_inicio1 = fecha_inicio;
    if ( fecha_inicio !== undefined ) {
        fecha_inicio1 = new Date(fecha_inicio + "T00:00:00");
        if ( isNaN(fecha_inicio1.getTime()) ) {
            return {ok: false, error: 'Fecha de inicio inválida'};
        };
    }

    let fecha_final = fecha_finalizacion;
    if ( fecha_finalizacion !== undefined ) {
        fecha_final = new Date(fecha_finalizacion + "T00:00:00");;
        if ( isNaN(fecha_final.getTime()) ) {
            return {ok: false, error: 'Fecha de finalización inválida'};
        };
    }
    
    return { ok: true, data: { nombre, fecha_inicio: fecha_inicio1, fecha_finalizacion: fecha_final }};
};

module.exports = { validarEvento };