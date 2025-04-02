import { Router } from 'express';
import {  obtenerComprasConDetalles} from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/compras', obtenerComprasConDetalles);

export default router;