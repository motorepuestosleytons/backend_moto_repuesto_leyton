import { pool } from '../db.js';

// Obtener todas las compras con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerComprasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
     SELECT 
    c.id_compra,
    dc.id_detalle_compra,
    c.fecha_compra,
    p.nombre_proveedor AS nombre_proveedor,
    pr.nombre_ AS nombre_producto,
    dc.cantidad,
    dc.precio_unitario,
    (dc.cantidad * dc.precio_unitario) AS subtotal
   FROM compra c
   INNER JOIN proveedor p ON c.id_proveedor = p.id_prov
   INNER JOIN detalle_compra dc ON c.id_compra = dc.id_compra
   INNER JOIN productos pr ON dc.id_producto = pr.id_producto;
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error
    });
  }
};