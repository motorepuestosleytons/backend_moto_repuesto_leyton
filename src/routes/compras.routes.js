import { Router } from 'express';
import {  obtenerMarcas,obtenerMarca } from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/compras', obtenerMarcas);

// Ruta para obtener un cliente por su ID
router.get('/compra/:id', obtenerMarca);

export default router;