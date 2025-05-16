import { pool2 } from '../db.js';

// **1. Análisis de Ventas por Dimensión Tiempo**

// 1.1 Total de ventas por día
export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT DATE_FORMAT(t.Fecha, '%Y-%m-%d') AS dia, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas
       FROM Hechos_Venta hv
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY t.Fecha
       ORDER BY t.Fecha;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por día.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las estadísticas de ventas por día.', error: error.message });
  }
};

// 1.2 Total de ventas por mes
export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.Mes, ROUND(SUM(hv.cantidad * hv.precio_unitario), 1) AS total_ventas
       FROM Hechos_Venta hv
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY t.Mes
       ORDER BY t.Mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las estadísticas de ventas por mes.', error: error.message });
  }
};

// 1.3 Total de ventas por año
export const totalVentasPorAno = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.Ayo, ROUND(SUM(hv.cantidad * hv.precio_unitario), 2) AS total_ventas
       FROM Hechos_Venta hv
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY t.Ayo
       ORDER BY t.Ayo;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por año.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las estadísticas de ventas por año.', error: error.message });
  }
};

// **3. Análisis de Ventas por Cliente**

// 3.1 Total de compras por cliente
export const totalComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, ROUND(SUM(hv.cantidad * hv.precio_unitario), 2) AS total_compras
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido
       ORDER BY total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de compras por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las compras por cliente.', error: error.message });
  }
};

// 3.2 Cantidad de compras por cliente
export const cantidadComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, COUNT(DISTINCT hv.id_hechos_venta) AS cantidad_compras
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido
       ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de cantidad de compras por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener la cantidad de compras por cliente.', error: error.message });
  }
};

// 3.3 Total de compras por cliente y mes
export const totalComprasPorClienteMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, t.Ayo, t.Mes, SUM(hv.cantidad * hv.precio_unitario) AS total_compras
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido, t.Ayo, t.Mes
       ORDER BY t.Ayo, t.Mes, total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de compras por cliente y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las compras por cliente y mes.', error: error.message });
  }
};

// **4. Análisis de Ventas por Producto**

// 4.1 Productos más vendidos por cantidad
export const productosMasVendidosPorCantidad = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_
       ORDER BY cantidad_vendida DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de productos vendidos.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los productos más vendidos por cantidad.', error: error.message });
  }
};

// 4.2 Productos más vendidos por valor total
export const productosMasVendidosPorValor = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de productos por valor total.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los productos más vendidos por valor.', error: error.message });
  }
};

// 4.3 Ventas de productos por mes
export const ventasProductosPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_, t.Ayo, t.Mes, SUM(hv.cantidad) AS cantidad_vendida, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY p.id_producto, p.nombre_, t.Ayo, t.Mes
       ORDER BY t.Ayo, t.Mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de ventas de productos por mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas de productos por mes.', error: error.message });
  }
};

// **5. Análisis de Ventas por Marca**

// 5.1 Total de ventas por marca
export const totalVentasPorMarca = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.Marca, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       GROUP BY p.Marca
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de ventas por marca.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por marca.', error: error.message });
  }
};

// 5.2 Total de ventas por marca y mes
export const totalVentasPorMarcaMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.Marca, t.Ayo, t.Mes, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY p.Marca, t.Ayo, t.Mes
       ORDER BY t.Ayo, t.Mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de ventas por marca y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por marca y mes.', error: error.message });
  }
};

// **10. Análisis de Stock**

// 10.1 Productos con bajo stock
export const productosBajoStock = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_, p.stock
       FROM Dim_Producto p
       WHERE p.stock < 70
       ORDER BY p.stock ASC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron productos con bajo stock.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los productos con bajo stock.', error: error.message });
  }
};

// 10.2 Stock por marca
export const stockPorMarca = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.Marca, SUM(p.stock) AS stock_total
       FROM Dim_Producto p
       GROUP BY p.Marca
       ORDER BY stock_total DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de stock por marca.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el stock por marca.', error: error.message });
  }
};

// **11. Análisis Combinado de Ventas**

// 11.3 Ventas por cliente, marca y mes
export const ventasPorClienteMarcaMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, p.Marca, t.Ayo, t.Mes, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido, p.Marca, t.Ayo, t.Mes
       ORDER BY t.Ayo, t.Mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de ventas por cliente, marca y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por cliente, marca y mes.', error: error.message });
  }
};

// **14. Análisis de Clientes Frecuentes**

// 14.1 Clientes que compran más frecuentemente
export const clientesFrecuentes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, COUNT(DISTINCT hv.id_hechos_venta) AS cantidad_compras, SUM(hv.cantidad * hv.precio_unitario) AS total_compras
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido
       HAVING COUNT(DISTINCT hv.id_hechos_venta) > 1
       ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron clientes frecuentes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los clientes frecuentes.', error: error.message });
  }
};

// 14.2 Clientes frecuentes por mes
export const clientesFrecuentesPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, t.Ayo, t.Mes, COUNT(DISTINCT hv.id_hechos_venta) AS cantidad_compras
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido, t.Ayo, t.Mes
       HAVING COUNT(DISTINCT hv.id_hechos_venta) > 1
       ORDER BY t.Ayo, t.Mes, cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron clientes frecuentes por mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los clientes frecuentes por mes.', error: error.message });
  }
};

// **15. Análisis de Productos por Cliente**

// 15.1 Productos más comprados por cliente
export const productosMasCompradosPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, p.nombre_, SUM(hv.cantidad) AS cantidad_comprada, SUM(hv.cantidad * hv.precio_unitario) AS total_gastado
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido, p.id_producto, p.nombre_
       ORDER BY total_gastado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de productos comprados por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los productos más comprados por cliente.', error: error.message });
  }
};

// 15.2 Marcas más compradas por cliente
export const marcasMasCompradasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre_cliente, c.apellido, p.Marca, SUM(hv.cantidad) AS cantidad_comprada, SUM(hv.cantidad * hv.precio_unitario) AS total_gastado
       FROM Hechos_Venta hv
       JOIN Dim_Cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       GROUP BY c.id_cliente, c.nombre_cliente, c.apellido, p.Marca
       ORDER BY total_gastado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de marcas compradas por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las marcas más compradas por cliente.', error: error.message });
  }
};

// **16. Análisis de Ventas por Día de la Semana**

// 16.1 Total de ventas por día de la semana
export const totalVentasPorDiaSemana = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT DAYNAME(hv.fecha_venta) AS dia_semana, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas
       FROM Hechos_Venta hv
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY DAYNAME(hv.fecha_venta)
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de ventas por día de la semana.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por día de la semana.', error: error.message });
  }
};

// 16.2 Ventas por marca y día de la semana
export const ventasPorMarcaDiaSemana = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.Marca, DAYNAME(hv.fecha_venta) AS dia_semana, SUM(hv.cantidad * hv.precio_unitario) AS total_ventas
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
       GROUP BY p.Marca, DAYNAME(hv.fecha_venta)
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de ventas por marca y día de la semana.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por marca y día de la semana.', error: error.message });
  }
};

// **17. Análisis de Rotación de Inventario**

// 17.1 Productos con mayor rotación
export const productosMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_, p.stock AS stock_inicial, SUM(hv.cantidad) AS total_vendido, (SUM(hv.cantidad) / p.stock) AS tasa_rotacion
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       WHERE p.stock > 0
       GROUP BY p.id_producto, p.nombre_, p.stock
       ORDER BY tasa_rotacion DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de rotación de productos.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los productos con mayor rotación.', error: error.message });
  }
};

// 17.2 Marcas con mayor rotación
export const marcasMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.Marca, SUM(p.stock) AS stock_total, SUM(hv.cantidad) AS total_vendido, (SUM(hv.cantidad) / SUM(p.stock)) AS tasa_rotacion
       FROM Hechos_Venta hv
       JOIN Dim_Producto p ON hv.id_producto = p.id_producto
       GROUP BY p.Marca
       HAVING SUM(p.stock) > 0
       ORDER BY tasa_rotacion DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de rotación por marca.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las marcas con mayor rotación.', error: error.message });
  }
};