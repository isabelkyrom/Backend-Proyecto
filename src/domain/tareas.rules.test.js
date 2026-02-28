const { validarTarea, validarMod } = require('./tareas.rules');

// CREACION de tareas
test('Rechaza nombre vacio', () => {
    const r = validarTarea({ nombre: '', categoria:'Escuela', fecha_finalizacion: '2026-02-02'})
});
test('Rechaza nombre que no sea string', () => {
    const r = validarTarea({ nombre: 345, categoria:'Escuela', fecha_finalizacion: '2026-02-02'})
});
test('Rechaza nombre con menos de 4 letras', () => {
    const r = validarTarea({ nombre: 'fre', categoria:'Escuela', fecha_finalizacion: '2026-02-02'})
});

    // categoria
test('Rechaza categoria vacia', () => {
    const r = validarTarea({ nombre: 'fre', categoria:'', fecha_finalizacion: '2026-02-02'})
});

test('Rechaza categoria que no sea string', () => {
    const r = validarTarea({ nombre: 'kyra', categoria:455, fecha_finalizacion: '2026-02-02'})
});

    // fecha
test('Rechaza fecha que no sea formato date', () => {
    const r = validarTarea({ nombre: 'kyra', categoria:'455', fecha_finalizacion: 'frgt'})
});

// MODIFICACION
    // nombre
test('Rechaza nombre que no sea string', () => {
    const r = validarMod({ nombre: 454, categoria:'455', fecha_finalizacion: '2026-02-02'})
});

test('Rechaza nombre que sea tenga menos de 4 letras', () => {
    const r = validarMod({ nombre: 'rom', categoria:'455', fecha_finalizacion: '2026-02-02'})
});

    // categoria
test('Rechaza categoria que no sea string', () => {
    const r = validarMod({ nombre: 'kyra', categoria:455, fecha_finalizacion: '2026-02-02'})
});

    // fecha
test('Rechaza fecha  que no sea string', () => {
    const r = validarMod({ nombre: 'kyra', categoria:'455', fecha_finalizacion: '2026-024-02'})
});

