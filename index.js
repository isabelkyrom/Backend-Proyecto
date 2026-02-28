// Librerias
const express = require('express');
const cors = require('cors');
const {pool} = require('./src/db');

// Routers
const { router: tareasRouter } = require('./src/routes/tareas.routes');
const { router: usersRouter } = require('./src/routes/users.routes');
const { router: eventosRouter } = require('./src/routes/eventos.routes')

const PORT = process.env.PORT || 3000

const app = express();

const allowed = [
  'https://frontend-proyecto-ten.vercel.app',
  'http://localhost:3001',
];

app.use(cors({
  origin: allowed
  }
}));

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

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
