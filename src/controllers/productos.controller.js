import { pool } from '../db.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Productos');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
      error: error
    });
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [req.params.id]);
    
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

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const { 
      nombre_, 
      modelo, 
      precio_venta, 
      precio_compra, 
      stock, 
      id_marca,
      imagen
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_ || !modelo || !precio_venta || !precio_compra || stock === undefined || !id_marca) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre_, modelo, precio_venta, precio_compra, stock o id_marca.'
      });
    }

    // Validaciones detalladas
    if (typeof nombre_ !== 'string' || nombre_.length > 50) {
      return res.status(400).json({
        mensaje: 'El nombre_ debe ser una cadena de texto de máximo 50 caracteres.'
      });
    }

    if (typeof modelo !== 'string' || modelo.length > 40) {
      return res.status(400).json({
        mensaje: 'El modelo debe ser una cadena de texto de máximo 40 caracteres.'
      });
    }

    if (typeof precio_venta !== 'number' || precio_venta <= 0) {
      return res.status(400).json({
        mensaje: 'El precio de venta debe ser un número mayor a 0.'
      });
    }

    if (typeof precio_compra !== 'number' || precio_compra <= 0) {
      return res.status(400).json({
        mensaje: 'El precio de compra debe ser un número mayor a 0.'
      });
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({
        mensaje: 'El stock debe ser un número entero mayor o igual a 0.'
      });
    }

    if (!Number.isInteger(id_marca) || id_marca <= 0) {
      return res.status(400).json({
        mensaje: 'El id_marca debe ser un número entero mayor a 0.'
      });
    }

    // imagen es opcional, si viene valida que sea string base64
    if (imagen && typeof imagen !== 'string') {
      return res.status(400).json({
        mensaje: 'La imagen debe ser una cadena de texto codificada en base64.'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO productos 
      (nombre_, modelo, precio_venta, precio_compra, stock, imagen, id_marca) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_,
        modelo,
        precio_venta,
        precio_compra,
        stock,
        imagen || null,
        id_marca
      ]
    );

    res.status(201).json({ 
      id_producto: result.insertId,
      mensaje: 'Producto registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
      error: error.message
    });
  }
};


// Eliminar un producto por su ID
export const eliminarProducto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el producto. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error
    });
  }
};

// Actualizar un producto por su ID (parcial o completa)
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    // Ejecutar la consulta de actualización
    const [resultado] = await pool.query(
      'UPDATE productos SET ? WHERE id_producto = ?',
      [datos, id]
    );

    // Si no se afectaron filas, significa que el ID no existe
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El producto con ID ${id} no existe.`,
      });
    }

    // Consultar el producto actualizado para retornarlo en la respuesta
    const [productoActualizado] = await pool.query(
      'SELECT * FROM productos WHERE id_producto = ?',
      [id]
    );

    res.status(200).json({
      mensaje: 'Producto actualizado correctamente.',
      producto: productoActualizado[0] // Retorna el producto actualizado
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el producto.',
      error: error.message,
    });
  }
};