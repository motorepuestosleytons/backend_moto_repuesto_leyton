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
      INNER JOIN productos pr ON dc.id_producto = pr.id_producto
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error.message
    });
  }
};

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        c.id_compra,
        c.fecha_compra,
        p.nombre_proveedor AS nombre_proveedor,
        SUM(dc.total) AS total_compra
      FROM compra c
      INNER JOIN proveedor p ON c.id_proveedor = p.id_prov
      INNER JOIN detalle_compra dc ON c.id_compra = dc.id_compra
      GROUP BY c.id_compra, c.fecha_compra, p.nombre_proveedor
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error.message
    });
  }
};

// Eliminar una compra (los detalles se eliminan automáticamente por ON DELETE CASCADE)
export const eliminarCompra = async (req, res) => {
  try {
    const { id_compra } = req.params;

    const [result] = await pool.query('DELETE FROM compra WHERE id_compra = ?', [id_compra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    res.json({ mensaje: 'Compra y sus detalles eliminados correctamente' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar la compra',
      error: error.message
    });
  }
};

// Registrar una nueva compra con detalles
export const registrarCompra = async (req, res) => {
  const { id_proveedor, fecha_compra, detalles } = req.body;

  try {
    // Validar que el producto exista
    for (const detalle of detalles) {
      const [producto] = await pool.query(
        'SELECT stock FROM productos WHERE id_producto = ?',
        [detalle.id_producto]
      );
      if (producto.length === 0) {
        return res.status(400).json({
          mensaje: `Producto no encontrado para ID ${detalle.id_producto}`
        });
      }
    }

    // Insertar la compra
    const [compraResult] = await pool.query(
      'INSERT INTO compra (id_proveedor, fecha_compra) VALUES (?, ?)',
      [id_proveedor, fecha_compra]
    );

    const id_compra = compraResult.insertId;

    // Insertar detalles y actualizar stock
    for (const detalle of detalles) {
      const total = detalle.cantidad * detalle.precio_unitario;
      await pool.query(
        'INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?, ?)',
        [id_compra, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, total]
      );
      await pool.query(
        'UPDATE productos SET stock = stock + ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Compra registrada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la compra', error: error.message });
  }
};

// Actualizar una compra con sus detalles
export const actualizarCompra = async (req, res) => {
  const { id_compra } = req.params;
  const { id_proveedor, fecha_compra, detalles } = req.body;

  try {
    // Actualizar la compra
    const [compraResult] = await pool.query(
      'UPDATE compra SET id_proveedor = ?, fecha_compra = ? WHERE id_compra = ?',
      [id_proveedor, fecha_compra, id_compra]
    );

    if (compraResult.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    // Obtener detalles actuales para restaurar stock
    const [detallesActuales] = await pool.query(
      'SELECT id_producto, cantidad FROM detalle_compra WHERE id_compra = ?',
      [id_compra]
    );

    // Restaurar stock de productos anteriores
    for (const detalle of detallesActuales) {
      await pool.query(
        'UPDATE productos SET stock = stock - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    // Eliminar detalles actuales
    await pool.query('DELETE FROM detalle_compra WHERE id_compra = ?', [id_compra]);

    // Insertar nuevos detalles y actualizar stock
    for (const detalle of detalles) {
      const total = detalle.cantidad * detalle.precio_unitario;
      await pool.query(
        'INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?, ?)',
        [id_compra, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, total]
      );
      await pool.query(
        'UPDATE productos SET stock = stock + ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Compra actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la compra', error: error.message });
  }
};

// Obtener una compra específica por id_compra
export const obtenerCompraPorId = async (req, res) => {
  try {
    const { id_compra } = req.params;

    const [compra] = await pool.query(`
      SELECT 
        c.id_compra,
        c.id_proveedor,
        c.fecha_compra,
        SUM(dc.total) AS total_compra
      FROM compra c
      INNER JOIN detalle_compra dc ON c.id_compra = dc.id_compra
      WHERE c.id_compra = ?
      GROUP BY c.id_compra, c.id_proveedor, c.fecha_compra
    `, [id_compra]);

    if (compra.length === 0) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    res.json(compra[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los datos de la compra.',
      error: error.message
    });
  }
};