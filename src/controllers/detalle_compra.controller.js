import { pool } from '../db.js';

// Obtener todos los detalles compra
export const obtenerDetalles_compra = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Detalle_compra');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
      error: error
    });
  }
};

// Obtener un detalle compra por su ID
export const obtenerDetalle_compra = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Detalle_compra WHERE id_detalle_compra = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del producto no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del producto.'
    });
  }
};