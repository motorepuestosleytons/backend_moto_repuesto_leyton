import { Router } from 'express';
import { obtenerVentas, obtenerVenta } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/ventas', obtenerVentas);

// Ruta para obtener un cliente por su ID
router.get('/venta/:id', obtenerVenta);

export default router;