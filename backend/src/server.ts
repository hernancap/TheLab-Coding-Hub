import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/usuario.routes.js';
import eventoRouter from './routes/evento.routes.js';
import inscripcionRouter from './routes/inscripcion.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/users', usuarioRouter);
app.use('/api/events', eventoRouter);
app.use('/api/inscripciones', inscripcionRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
