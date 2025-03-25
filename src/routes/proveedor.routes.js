import { Router } from 'express';
import {  obtenerProveedores, obtenerProveedor } from '../controllers/proveedor.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/proveedores', obtenerProveedores);

// Ruta para obtener un cliente por su ID
router.get('/proveedor/:id', obtenerProveedor);

export default router;