import { Router } from 'express';
import {  obtener, obtenerCliente } from '../controllers/proveedor.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/cliente/:id', obtenerCliente);

export default router;