import cors from 'cors';
import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { BarangData, PerusahaanData } from './types';
import { db } from './util';

import { getCurrentUser, login } from './controller/userController';
import { addBarang, buyBarang, deleteBarang, getBarang, getBarangById, updateBarang } from './controller/barangController';
import { addPerusahaan, deletePerusahaan, getPerusahaan, getPerusahaanById, updatePerusahaan } from './controller/perusahaanController';

import { validateJWT } from './middlewares';

const app: Express = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', login);

app.get('/self', validateJWT, getCurrentUser);

app.get('/barang', getBarang);

app.get('/barang/:id', getBarangById);

app.post('/barang', validateJWT, addBarang);

app.post('/buy/:id', buyBarang);

app.put('/barang/:id', validateJWT, updateBarang);

app.delete('/barang/:id', validateJWT, deleteBarang);

app.get('/perusahaan', validateJWT, getPerusahaan);

app.get('/perusahaan/:id', validateJWT, getPerusahaanById);

app.post('/perusahaan', validateJWT, addPerusahaan);

app.put('/perusahaan/:id', validateJWT, updatePerusahaan);

app.delete('/perusahaan/:id', validateJWT, deletePerusahaan);

app.listen(port, ()=> {
    console.log(`Server started at http://localhost:${port}`);
});

export default app;
