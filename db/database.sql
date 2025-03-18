-- Definición de la base de datos
CREATE DATABASE distribuidora_bd;
USE distribuidora_bd;

-- Definición de las tablas

-- Tabla Clientes: almacena información de los clientes
CREATE TABLE Clientes ( 
    id_cliente INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    celular VARCHAR(12),
    direccion VARCHAR(50),
    cedula VARCHAR(20) 
);

-- Tabla Usuarios: almacena credenciales de acceso
CREATE TABLE Usuarios (
    usuario VARCHAR(20) PRIMARY KEY,
    contraseña VARCHAR(20)
);

-- Tabla Productos: almacena información de los productos disponibles
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(20),
    descripcion VARCHAR(100),
    categoria VARCHAR(20),
    precio_unitario FLOAT,
    stock INT
);

-- Tabla Ventas: registra las ventas realizadas
CREATE TABLE Ventas ( 
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha_venta DATETIME,
    credito BIT
);

-- Tabla Creditos: gestiona los créditos otorgados a clientes
CREATE TABLE Creditos (
    id_credito INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    tipo_credito VARCHAR(20),
    plazo_pago INT,
    tasa_interes FLOAT,
    fecha_vencimiento DATE,
    monto_credito FLOAT,
    limite_credito INT
);

-- Tabla Abonos: registra los abonos realizados por los clientes
CREATE TABLE Abonos (
    id_abono INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    monto FLOAT,
    fecha_abono DATE
);

-- Tabla Detalles_Ventas: detalla los productos vendidos en cada venta
CREATE TABLE Detalles_Ventas (
    id_detalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    cantidad INT,
    precio_detalle FLOAT
);

-- Tabla Compras: registra las compras realizadas por la distribuidora
CREATE TABLE Compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    fecha_compra DATE
);

-- Tabla Detalles_Compras: detalla los productos adquiridos en cada compra
CREATE TABLE Detalles_Compras (
    id_detalle_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_compra INT,
    cantidad INT,
    precio FLOAT
);


-- Relaciones entre tablas con ALTER TABLE

-- Relación Ventas -> Clientes
ALTER TABLE Ventas
ADD CONSTRAINT fk_cliente_venta FOREIGN KEY (id_cliente) REFERENCES Clientes (id_cliente);

-- Configuración de fecha_venta por defecto
ALTER TABLE Ventas
MODIFY COLUMN fecha_venta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Relación Creditos -> Clientes
ALTER TABLE Creditos
ADD CONSTRAINT fk_cliente_credito FOREIGN KEY (id_cliente) REFERENCES Clientes (id_cliente);

-- Relación Abonos -> Clientes
ALTER TABLE Abonos
ADD CONSTRAINT fk_cliente_abono FOREIGN KEY (id_cliente) REFERENCES Clientes (id_cliente);

-- Relación Detalles_Ventas -> Ventas y Productos
ALTER TABLE Detalles_Ventas
ADD CONSTRAINT fk_venta_detalle FOREIGN KEY (id_venta) REFERENCES Ventas (id_venta),
ADD CONSTRAINT fk_producto_detalle FOREIGN KEY (id_producto) REFERENCES Productos (id_producto);

-- Relación Detalles_Compras -> Productos y Compras
ALTER TABLE Detalles_Compras
ADD CONSTRAINT fk_producto_compra FOREIGN KEY (id_producto) REFERENCES Productos (id_producto),
ADD CONSTRAINT fk_compra_detalle FOREIGN KEY (id_compra) REFERENCES Compras (id_compra);


-- Inserciones lógicas secuenciales
-- Orden: tablas independientes primero, luego las dependientes

-- Inserciones en Usuarios (independiente)
INSERT INTO Usuarios (usuario, contraseña) VALUES
('dissmar', 'dissmarpass'),
('admin1', 'admin123'),
('user2', 'user456');

-- Inserciones en Clientes (independiente)
INSERT INTO Clientes (nombre, apellido, celular, direccion, cedula) VALUES
('Emily', 'Espinoza', '8859-3520', 'Avenida1', '365-1234-100R'),
('David', 'Miranda', '8712-2314', 'Avenida2', '365-1023-1999T'),
('Alex', 'Alvarez', '8756-2345', 'Avenida3', '365-674557-100Y');

-- Inserciones en Productos (independiente)
INSERT INTO Productos (nombre_producto, descripcion, categoria, precio_unitario, stock) VALUES
('Auriculares Sony', 'Auriculares inalámbricos', 'Electrónica', 349.99, 40),
('Arroz', 'Arroz blanco grano largo', 'Cereal', 20.50, 7800),
('Frijoles Negros', 'Frijoles negros secos', 'Legumbres', 20.50, 1100);

-- Inserciones en Ventas (depende de Clientes)
INSERT INTO Ventas (id_cliente, fecha_venta, credito) VALUES
(1, '2024-05-06 10:00:00', 1),
(2, '2024-05-06 12:00:00', 1),
(3, '2024-05-07 15:00:00', 1);

-- Inserciones en Creditos (depende de Clientes)
INSERT INTO Creditos (id_cliente, tipo_credito, plazo_pago, tasa_interes, fecha_vencimiento, monto_credito, limite_credito) VALUES
(1, 'Largo plazo', 4, 20.5, '2024-09-05', 13000, 15000),
(2, 'Largo plazo', 4, 20.3, '2024-09-06', 12000, 15000),
(3, 'Largo plazo', 5, 21.5, '2024-10-06', 14000, 15000);

-- Inserciones en Abonos (depende de Clientes)
INSERT INTO Abonos (id_cliente, monto, fecha_abono) VALUES
(1, 3500, '2024-06-11'),
(2, 3500, '2024-06-07'),
(3, 2500, '2024-06-01');

-- Inserciones en Compras (independiente)
INSERT INTO Compras (fecha_compra) VALUES
('2024-07-01'),
('2024-07-02'),
('2024-07-03');

-- Inserciones en Detalles_Ventas (depende de Ventas y Productos)
INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_detalle) VALUES
(1, 1, 30, 349.99),
(2, 2, 500, 20.50),
(3, 3, 680, 20.50);

-- Inserciones en Detalles_Compras (depende de Productos y Compras)
INSERT INTO Detalles_Compras (id_producto, id_compra, cantidad, precio) VALUES
(1, 1, 100, 300),
(2, 2, 50, 10),
(3, 3, 200, 10.50);

-- Sentencias de actualización (un registro por tabla)

-- Actualizar Clientes (id_cliente = 1)
UPDATE Clientes
SET nombre = 'Emilia', direccion = 'Avenida Nueva'
WHERE id_cliente = 1;

-- Actualizar Usuarios (usuario = 'dissmar')
UPDATE Usuarios
SET contraseña = 'newpass2024'
WHERE usuario = 'dissmar';

-- Actualizar Productos (id_producto = 1)
UPDATE Productos
SET precio_unitario = 399.99, stock = 50
WHERE id_producto = 1;

-- Actualizar Ventas (id_venta = 1)
UPDATE Ventas
SET credito = 0
WHERE id_venta = 1;

-- Actualizar Creditos (id_credito = 1)
UPDATE Creditos
SET monto_credito = 10000
WHERE id_credito = 1;

-- Actualizar Abonos (id_abono = 1)
UPDATE Abonos
SET monto = 4000
WHERE id_abono = 1;

-- Actualizar Compras (id_compra = 1)
UPDATE Compras
SET fecha_compra = '2024-07-10'
WHERE id_compra = 1;

-- Actualizar Detalles_Ventas (id_detalle_venta = 1)
UPDATE Detalles_Ventas
SET cantidad = 40
WHERE id_detalle_venta = 1;

-- Actualizar Detalles_Compras (id_detalle_compra = 1)
UPDATE Detalles_Compras
SET cantidad = 150
WHERE id_detalle_compra = 1;


-- Sentencias de eliminación (un registro por tabla)
-- Orden: primero tablas dependientes, luego independientes

-- Eliminar Detalles_Ventas (id_detalle_venta = 1)
DELETE FROM Detalles_Ventas WHERE id_detalle_venta = 1;

-- Eliminar Detalles_Compras (id_detalle_compra = 1)
DELETE FROM Detalles_Compras WHERE id_detalle_compra = 1;

-- Eliminar Abonos (id_abono = 1)
DELETE FROM Abonos WHERE id_abono = 1;

-- Eliminar Creditos (id_credito = 1)
DELETE FROM Creditos WHERE id_credito = 1;

-- Eliminar Ventas (id_venta = 1)
DELETE FROM Ventas WHERE id_venta = 1;

-- Eliminar Compras (id_compra = 1)
DELETE FROM Compras WHERE id_compra = 1;

-- Eliminar Productos (id_producto = 1)
DELETE FROM Productos WHERE id_producto = 1;

-- Eliminar Clientes (id_cliente = 1)
DELETE FROM Clientes WHERE id_cliente = 1;

-- Eliminar Usuarios (usuario = 'dissmar')
DELETE FROM Usuarios WHERE usuario = 'dissmar';