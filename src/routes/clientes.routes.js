import { Router } from 'express';
import { obtenerClientes, obtenerCliente, registrarCliente, eliminarCliente, actualizarCliente, buscarClientes } from '../controllers/clientes.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/clientes/:id', obtenerCliente);

// Ruta para buscar clientes por nombre, apellido o cédula
router.get('/buscarclientes', buscarClientes);

// Ruta para registrar un nuevo cliente
router.post('/registrarcliente', registrarCliente);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarcliente/:id', eliminarCliente);

// Ruta para actualizar un cliente por su ID
router.patch('/actualizarcliente/:id', actualizarCliente);

export default router;
