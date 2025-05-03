import { Router } from 'express';
import {  obtenerComprasConDetalles, obtenerCompras, eliminarCompra, registrarCompra} from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/compras', obtenerComprasConDetalles);

router.get('/obtenercompras', obtenerCompras);

// Ruta para eliminar una compra
router.delete('/eliminarcompra/:id_compra', eliminarCompra);

router.post('/registrarcompra', registrarCompra);

export default router;