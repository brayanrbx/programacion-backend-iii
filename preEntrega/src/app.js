import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = process.env.PORT||3000;
const connection = mongoose.connect(`mongodb+srv://admin:admin01@cluster0.uxfb50k.mongodb.net/mockpets?retryWrites=true&w=majority`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use((req, res, next) => {
    console.log(`Método: ${req.method}, Ruta: ${req.url}`);
    next();
});

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`))
