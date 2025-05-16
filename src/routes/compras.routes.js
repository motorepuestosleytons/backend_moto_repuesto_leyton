import { Router } from 'express';
import {  obtenerComprasConDetalles, obtenerCompras, eliminarCompra, registrarCompra, obtenerCompraPorId, actualizarCompra} from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/compras', obtenerComprasConDetalles);

router.get('/obtenercompras', obtenerCompras);

// Ruta para eliminar una compra
router.delete('/eliminarcompra/:id_compra', eliminarCompra);

router.post('/registrarcompra', registrarCompra);

router.patch('/actualizarcompra/:id_compra', actualizarCompra);

// Ruta para obtener una compra por su ID
router.get('/obtenercompraporid/:id_compra', obtenerCompraPorId);

export default router;