import { Router } from 'express';
import {  obtenerDetalles_compra,obtenerDetalle_compra } from '../controllers/detalle_compra.controller.js';

const router = Router();

// Ruta para obtener todos loo detalles compra
router.get('/detalles_compra', obtenerDetalles_compra);

// Ruta para obtener un detalle compra
router.get('/detalle_compra/:id', obtenerDetalle_compra);

export default router;