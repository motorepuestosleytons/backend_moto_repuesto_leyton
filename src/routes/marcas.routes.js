import { Router } from 'express';
import {  obtenerMarcas, obtenerMarca, registrarMarca } from '../controllers/marcas.controller.js';

const router = Router();

// Ruta para obtener todas las Marcas
router.get('/marcas', obtenerMarcas);

// Ruta para obtener una Marca por su ID
router.get('/marca/:id', obtenerMarca);

// Ruta para registrar una marca
router.post('/registrarmarcas', registrarMarca);

export default router;