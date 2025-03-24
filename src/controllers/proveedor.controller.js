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