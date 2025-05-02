import { pool } from '../db.js';

// Obtener todos los proveedores
export const obtenerProveedores= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Proveedor');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
      error: error
    });
  }
};

// Obtener un proveedor por su ID
export const obtenerProveedor = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Proveedor WHERE id_prov = ?', [req.params.id]);
    
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

// Registrar un nuevo proveedor
export const registrarProveedor = async (req, res) => {
  try {
    const { 
      nombre_proveedor, 
      telefono, 
      empresa 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_proveedor || !telefono || !empresa) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre_proveedor, telefono o empresa.'
      });
    }

    // Validaciones adicionales
    if (typeof nombre_proveedor !== 'string' || nombre_proveedor.length > 50) {
      return res.status(400).json({
        mensaje: 'El nombre del proveedor debe ser una cadena de texto de máximo 50 caracteres.'
      });
    }

    if (typeof telefono !== 'string' || telefono.length > 15) {
      return res.status(400).json({
        mensaje: 'El teléfono debe ser una cadena de texto de máximo 15 caracteres.'
      });
    }

    // Validación adicional para el formato del teléfono (opcional, ajusta según tus necesidades)
    const telefonoRegex = /^[0-9+()-]+$/;
    if (!telefonoRegex.test(telefono)) {
      return res.status(400).json({
        mensaje: 'El teléfono solo puede contener números, y los caracteres +, (, ) o -.'
      });
    }

    if (typeof empresa !== 'string' || empresa.length > 100) {
      return res.status(400).json({
        mensaje: 'El nombre de la empresa debe ser una cadena de texto de máximo 100 caracteres.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO proveedor (nombre_proveedor, telefono, empresa) VALUES (?, ?, ?)',
      [
        nombre_proveedor,
        telefono,
        empresa
      ]
    );

    res.status(201).json({ 
      id_prov: result.insertId,
      mensaje: 'Proveedor registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el proveedor.',
      error: error.message
    });
  }
};

export const eliminarProveedor = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM proveedor WHERE id_prov = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el proveedor. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el proveedor.',
      error: error
    });
  }
};

export const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE proveedor SET ? WHERE id_prov = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El proveedor con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el proveedor.',
      error: error,
    });
  }
};