import { Router } from 'express';
import {  obtenerDetalles_venta, obtenerDetalle_venta } from '../controllers/detalle_ventas.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/detalles_venta', obtenerDetalles_venta);

// Ruta para obtener un cliente por su ID
router.get('/detalle_venta/:id', obtenerDetalle_venta);

export default router;