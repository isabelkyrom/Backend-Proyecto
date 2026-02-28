// Librerias
const express = require('express');
const cors = require('cors');

// Routers
const { router: tareasRouter } = require('./src/routes/tareas.routes');
const { router: usersRouter } = require('./src/routes/users.routes');
const { router: eventosRouter } = require('./src/routes/eventos.routes')

const PORT = process.env.PORT || 3000

const app = express();

const allowed = [
  'http://localhost:3000',
  'http://localhost:3001',
];

/*
app.use(cors({
  origin: function (origin, cb) {
    if (allowed.includes(origin)) return cb(null, true);
    return cb(new Error('CORS bloqueado: ' + origin));
  }
}));
*/
app.use(cors({
  origin: allowed
}));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('API OK');
})

app.use('/tareas', tareasRouter);
app.use('/users', usersRouter);
app.use('/eventos', eventosRouter)


app.listen(PORT, () => {
  console.log("Servidor Corriendo")
});

app.get('/health', (req, res) => {
  res.json({ok:true, service:'api'})
})