import { Router } from 'express';
import {  obtenerProveedores, obtenerProveedor, registrarProveedor } from '../controllers/proveedor.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/proveedores', obtenerProveedores);

// Ruta para obtener un cliente por su ID
router.get('/proveedor/:id', obtenerProveedor);

// Ruta para obtener un cliente por su ID
router.post('/registrarproveedor', registrarProveedor);

export default router;