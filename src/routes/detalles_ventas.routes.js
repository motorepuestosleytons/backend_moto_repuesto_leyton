import { Router } from 'express';
import { obtenerDetallesVenta } from '../controllers/detalles_ventas.controller.js'; // Asegúrate de que la ruta al controlador sea correcta

const router = Router();

// Ruta para obtener los detalles de una venta
router.get('/obtenerdetallesventa/:id', obtenerDetallesVenta);

export default router;