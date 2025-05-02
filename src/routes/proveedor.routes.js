import { Router } from 'express';
import {  obtenerProveedores,actualizarProveedor, eliminarProveedor, obtenerProveedor, registrarProveedor } from '../controllers/proveedor.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/proveedores', obtenerProveedores);

// Ruta para obtener un cliente por su ID
router.get('/proveedor/:id', obtenerProveedor);

// Ruta para obtener un cliente por su ID
router.post('/registrarproveedor', registrarProveedor);

// Ruta para eliminar un proveedor por su ID
router.delete('/eliminarproveedor/:id', eliminarProveedor);

// Ruta para actualizar un proveedor por su ID
router.patch('/actualizarproveedor/:id', actualizarProveedor);

export default router;