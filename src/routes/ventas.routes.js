import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas, eliminarVenta, registrarVenta } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/ventas', obtenerVentasConDetalles);

router.get('/obtenerventas', obtenerVentas);

// Ruta para eliminar una venta
router.delete('/eliminarventa/:id_venta', eliminarVenta);

// Ruta para registrar una nueva venta
router.post('/registrarventa', registrarVenta);


export default router;