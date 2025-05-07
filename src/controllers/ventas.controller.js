import { pool } from '../db.js';

// Obtener todas las compras con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerVentasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
    SELECT 
    v.id_venta,
    dv.id_detalle_venta,
    v.fecha_venta,
    CONCAT(c.nombre_cliente, ' ', c.apellido) AS nombre_cliente,
    p.nombre_ AS nombre_producto,
    dv.cantidad,
    dv.precio_unitario,
    (dv.cantidad * dv.precio_unitario) AS subtotal
    FROM venta v
    INNER JOIN cliente c ON v.id_cliente = c.id_cliente
    INNER JOIN detalle_venta dv ON v.id_venta = dv.id_venta
    INNER JOIN productos p ON dv.id_producto = p.id_producto;
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error
    });
  }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        v.id_venta,
        v.fecha_venta,
        CONCAT(c.nombre_cliente, ' ', c.apellido) AS nombre_cliente,
        SUM(dv.total) AS total_venta
      FROM venta v
      INNER JOIN cliente c ON v.id_cliente = c.id_cliente
      INNER JOIN detalle_venta dv ON v.id_venta = dv.id_venta
      GROUP BY v.id_venta, v.fecha_venta, c.nombre_cliente, c.apellido
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error.message
    });
  }
};


// Eliminar una venta (los detalles se eliminan automáticamente por ON DELETE CASCADE)
export const eliminarVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;

    const [result] = await pool.query('DELETE FROM venta WHERE id_venta = ?', [id_venta]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json({ mensaje: 'Venta y sus detalles eliminados correctamente' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar la venta',
      error: error.message
    });
  }
};


export const registrarVenta = async (req, res) => {
  const { id_cliente, fecha_venta, detalles } = req.body;

  try {
    // Validar stock suficiente para cada producto
    for (const detalle of detalles) {
      const [producto] = await pool.query(
        'SELECT stock FROM Productos WHERE id_producto = ?',
        [detalle.id_producto]
      );
      if (producto.length === 0 || producto[0].stock < detalle.cantidad) {
        return res.status(400).json({
          mensaje: `Stock insuficiente o producto no encontrado para ID ${detalle.id_producto}`
        });
      }
    }

    const fechaVentaFormateada = new Date(fecha_venta).toISOString().slice(0, 19).replace('T', ' '); // Convierte a 'YYYY-MM-DD HH:mm:ss'
    const [ventaResult] = await pool.query(
      'INSERT INTO Venta (id_cliente, fecha_venta) VALUES (?, ?)',
      [id_cliente, fechaVentaFormateada]
    );

    const id_venta = ventaResult.insertId;

    for (const detalle of detalles) {
      const total = detalle.cantidad * detalle.precio_unitario;
      await pool.query(
        'INSERT INTO Detalle_Venta (id_venta, id_producto, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?, ?)',
        [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, total]
      );
      await pool.query(
        'UPDATE Productos SET stock = stock - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta registrada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la venta', error: error.message });
  }
};

export const actualizarVenta = async (req, res) => {
  const { id_venta } = req.params;
  const { id_cliente, fecha_venta, detalles } = req.body;

  try {
    // Formatear la fecha al formato MySQL
    const fechaVentaFormateada = new Date(fecha_venta).toISOString().slice(0, 19).replace('T', ' ');

    // Actualizar la venta
    const [ventaResult] = await pool.query(
      'UPDATE venta SET id_cliente = ?, fecha_venta = ? WHERE id_venta = ?',
      [id_cliente, fechaVentaFormateada, id_venta]
    );

    if (ventaResult.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Obtener detalles actuales para restaurar stock
    const [detallesActuales] = await pool.query(
      'SELECT id_producto, cantidad FROM detalle_venta WHERE id_venta = ?',
      [id_venta]
    );

    // Restaurar stock de productos anteriores
    for (const detalle of detallesActuales) {
      await pool.query(
        'UPDATE productos SET stock = stock + ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    // Eliminar detalles actuales
    await pool.query('DELETE FROM detalle_venta WHERE id_venta = ?', [id_venta]);

    // Insertar nuevos detalles y actualizar stock
    for (const detalle of detalles) {
      const total = detalle.cantidad * detalle.precio_unitario;
      await pool.query(
        'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?, ?)',
        [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, total]
      );
      await pool.query(
        'UPDATE productos SET stock = stock - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la venta', error: error.message });
  }
};
