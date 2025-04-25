import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Cliente');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
      error: error
    });
  }
};

// Obtener un cliente por su ID
export const obtenerCliente = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Cliente WHERE id_cliente = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del cliente.'
    });
  }
};

// Buscar clientes por nombre, apellido o cédula
export const buscarClientes = async (req, res) => {
  try {
    const { termino } = req.query;
    const [result] = await pool.query(
      `SELECT * FROM Cliente WHERE nombre_cliente LIKE ? OR apellido LIKE ? OR cedula LIKE ?`,
      [`%${termino}%`, `%${termino}%`, `%${termino}%`]
    );

    if (result.length <= 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados para la búsqueda.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al realizar la búsqueda.',
      error: error.message
    });
  }
};

// Registrar un nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    const { 
      cedula, 
      nombre_cliente, 
      apellido, 
      telefono 
    } = req.body;

    // Validación básica de campos requeridos
    if (!cedula || !nombre_cliente || !apellido || !telefono) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: cedula, nombre_cliente, apellido o telefono.'
      });
    }

    // Validaciones adicionales
    if (typeof cedula !== 'string' || cedula.length > 16) {
      return res.status(400).json({
        mensaje: 'La cédula debe ser una cadena de texto de máximo 16 caracteres.'
      });
    }

    if (typeof nombre_cliente !== 'string' || nombre_cliente.length > 30) {
      return res.status(400).json({
        mensaje: 'El nombre del cliente debe ser una cadena de texto de máximo 30 caracteres.'
      });
    }

    if (typeof apellido !== 'string' || apellido.length > 20) {
      return res.status(400).json({
        mensaje: 'El apellido debe ser una cadena de texto de máximo 20 caracteres.'
      });
    }

    if (typeof telefono !== 'string' || telefono.length > 15) {
      return res.status(400).json({
        mensaje: 'El teléfono debe ser una cadena de texto de máximo 15 caracteres.'
      });
    }

    // Validación adicional para el formato del teléfono
    const telefonoRegex = /^[0-9+()-]+$/;
    if (!telefonoRegex.test(telefono)) {
      return res.status(400).json({
        mensaje: 'El teléfono solo puede contener números, y los caracteres +, (, ) o -.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Cliente (cedula, nombre_cliente, apellido, telefono) VALUES (?, ?, ?, ?)',
      [cedula, nombre_cliente, apellido, telefono]
    );

    res.status(201).json({ 
      id_cliente: result.insertId,
      mensaje: 'Cliente registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el cliente.',
      error: error.message
    });
  }
};

// Eliminar un cliente por su ID
export const eliminarCliente = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM cliente WHERE id_cliente = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el cliente. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el cliente.',
      error: error
    });
  }
};

// Actualizar un cliente por su ID (parcial o completa)
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE cliente SET ? WHERE id_cliente = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El cliente con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el cliente.',
      error: error,
    });
  }
};