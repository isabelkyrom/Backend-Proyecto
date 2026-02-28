const { validarCuenta } = require('./users.rules');

// CREACION cuenta
    // nombre de usuario
test('Rechaza nombre vacio', () => {
    const r = validarCuenta({ nombre: '', email: 'kyra@gmail.com', password: '09876543' })
});
test('Rechaza nombre que no sea string', () => {
    const r = validarCuenta({ nombre: 3453, email: 'kyra@gmail.com', password: '09876543' })
});
test('Rechaza nombre con menos de 4 letras', () => {
    const r = validarCuenta({ nombre: 'rom', email: 'kyra@gmail.com', password: '09876543' })
});

    // email
test('Rechaza email vacio', () => {
    const r = validarCuenta({ nombre: 'kyra', email: '', password: '09876543' })
});
test('Rechaza email que no sea string', () => {
    const r = validarCuenta({ nombre: 'Kyra', email: 34, password: '09876543' })
});
test('Rque no contenga @', () => {
    const r = validarCuenta({ nombre: 'kyra', email: 'kyragmail.com', password: '09876543' })
});
test('Rque no contenga .', () => {
    const r = validarCuenta({ nombre: 'kyra', email: 'kyra@gmailcom', password: '09876543' })
});

    // password
test('Rechaza password vacio', () => {
    const r = validarCuenta({ nombre: 'kyra', email: 'kyra@gmail.com', password: '' })
});
test('Rechaza password que no sea string', () => {
    const r = validarCuenta({ nombre: 'kyra', email: 'kyra@gmail.com', password: 987654343 })
});
test('Rechaza password con menos de 9 caracteres', () => {
    const r = validarCuenta({ nombre: 'kyra', email: 'kyra@gmail.com', password: '0987' })
});

