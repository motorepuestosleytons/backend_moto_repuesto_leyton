import { pool } from '../db.js';

// Obtener todas las Marcas
export const obtenerMarcas = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Marca');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las marcas.',
      error: error.message
    });
  }
};

// Obtener una marca por su ID
export const obtenerMarca = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Marca WHERE id_marca = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} de la marca no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de la marca.',
      error: error.message
    });
  }
};

// Buscar marcas por nombre
export const buscarMarcas = async (req, res) => {
  try {
    const { termino } = req.query;
    const [result] = await pool.query(
      `SELECT * FROM Marca WHERE marca LIKE ?`,
      [`%${termino}%`]
    );

    if (result.length <= 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados para la búsqueda.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al realizar la búsqueda de marcas.',
      error: error.message
    });
  }
};

// Registrar una nueva marca
export const registrarMarca = async (req, res) => {
  try {
    const { marca } = req.body;

    // Validar que el campo marca esté presente y sea una cadena de texto válida
    if (!marca || typeof marca !== 'string' || marca.length > 30) {
      return res.status(400).json({
        mensaje: 'El nombre de la marca es obligatorio y debe ser una cadena de máximo 30 caracteres.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Marca (marca) VALUES (?)',
      [marca]
    );

    res.status(201).json({ 
      id_marca: result.insertId,
      mensaje: 'Marca registrada exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la marca.',
      error: error.message
    });
  }
};

// Eliminar una marca por su ID
export const eliminarMarca = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM marca WHERE id_marca = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la marca. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la marca.',
      error: error
    });
  }
};

// Actualizar una marca por su ID (parcial o completa)
export const actualizarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE marca SET ? WHERE id_marca = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `La marca con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar la marca.',
      error: error,
    });
  }
};