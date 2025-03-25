import express from 'express';
import cors from 'cors';
import rutasClientes from './routes/clientes.routes.js';
import rutasUsuarios from './routes/usuarios.routes.js';
import rutasProductos from './routes/productos.routes.js';
import rutasMarcas from './routes/marcas.routes.js';
import rutasVentas from './routes/ventas.routes.js';
import rutasCompras from './routes/compras.routes.js';
import rutasDetalles_venta from './routes/detalle_ventas.routes.js';
import rutasDetalles_compra from './routes/detalle_compra.routes.js';
import rutasProveedores from './routes/proveedor.routes.js'

const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api', rutasClientes);
app.use('/api', rutasUsuarios);
app.use('/api', rutasProductos);
app.use('/api', rutasMarcas);
app.use('/api', rutasVentas);
app.use('/api', rutasCompras);
app.use('/api', rutasDetalles_venta);
app.use('/api', rutasDetalles_compra);
app.use('/api', rutasProveedores);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
    });
});

export default app;