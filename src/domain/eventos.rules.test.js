const { validarEvento } = require('./eventos.rules');

test('Rechaza nombre vacio', () => {
    const r = validarEvento({ nombre: '', fecha_inicio: '2026-02-02', fecha_finalizacion: '2026-02-02'})
});

test('Rechaza nombre menor a 4 letras', () => {
    const r = validarEvento({ nombre: 'fre', fecha_inicio: '2026-02-02', fecha_finalizacion: '2026-02-02'})
});

test('Rechaza fecha vacía', () => {
    const r = validarEvento({ nombre: 'isabel', fecha_inicio: '', fecha_finalizacion: ''})
});

test('Rechaza fecha en formato invalido', () => {
    const r = validarEvento({ nombre: 'isabel', fecha_inicio: '2026-02-024', fecha_finalizacion: '2026-02-02fr'})
});