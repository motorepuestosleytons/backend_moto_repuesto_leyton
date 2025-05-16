import { Router } from 'express';
import {
  totalVentasPorDia,
  totalVentasPorMes,
  totalVentasPorAno,
  totalComprasPorCliente,
  cantidadComprasPorCliente,
  totalComprasPorClienteMes,
  productosMasVendidosPorCantidad,
  productosMasVendidosPorValor,
  ventasProductosPorMes,
  totalVentasPorMarca,
  totalVentasPorMarcaMes,
  productosBajoStock,
  stockPorMarca,
  ventasPorClienteMarcaMes,
  clientesFrecuentes,
  clientesFrecuentesPorMes,
  productosMasCompradosPorCliente,
  marcasMasCompradasPorCliente,
  totalVentasPorDiaSemana,
  ventasPorMarcaDiaSemana,
  productosMayorRotacion,
  marcasMayorRotacion,
} from '../controllers/estadisticas.controller.js';

const router = Router();

// **1. Análisis de Ventas por Dimensión Tiempo**
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasPorMes);
router.get('/totalventasporano', totalVentasPorAno);

// **3. Análisis de Ventas por Cliente**
router.get('/totalcomprasporcliente', totalComprasPorCliente);
router.get('/cantidadcomprasporcliente', cantidadComprasPorCliente);
router.get('/totalcomprasporclientemes', totalComprasPorClienteMes);

// **4. Análisis de Ventas por Producto**
router.get('/productosmasvendidospcantidad', productosMasVendidosPorCantidad);
router.get('/productosmasvendidospvalor', productosMasVendidosPorValor);
router.get('/ventasproductospormes', ventasProductosPorMes);

// **5. Análisis de Ventas por Marca**
router.get('/totalventaspormarca', totalVentasPorMarca);
router.get('/totalventaspormarcames', totalVentasPorMarcaMes);

// **10. Análisis de Stock**
router.get('/productosbajostock', productosBajoStock);
router.get('/stockpormarca', stockPorMarca);

// **11. Análisis Combinado de Ventas**
router.get('/ventasporclientemarcames', ventasPorClienteMarcaMes);

// **14. Análisis de Clientes Frecuentes**
router.get('/clientesfrecuentes', clientesFrecuentes);
router.get('/clientesfrecuentespormes', clientesFrecuentesPorMes);

// **15. Análisis de Productos por Cliente**
router.get('/productosmascompradosporcliente', productosMasCompradosPorCliente);
router.get('/marcasmascompradasporcliente', marcasMasCompradasPorCliente);

// **16. Análisis de Ventas por Día de la Semana**
router.get('/totalventaspordiasemana', totalVentasPorDiaSemana);
router.get('/ventaspormarcadiasemana', ventasPorMarcaDiaSemana);

// **17. Análisis de Rotación de Inventario**
router.get('/productosmayorrotacion', productosMayorRotacion);
router.get('/marcasmayorrotacion', marcasMayorRotacion);

export default router;