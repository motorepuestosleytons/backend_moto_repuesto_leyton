import { pool } from '../db.js';

// Obtener todos las compras
export const obtenerMarcas= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Compra');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
      error: error
    });
  }
};

// Obtener una venta por su ID
export const obtenerMarca = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Compra WHERE id_compra = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} de la venta no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del cliente.'
    });
  }
};