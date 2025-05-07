CREATE DATABASE  IF NOT EXISTS `moto_repuestos_leyton_1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `moto_repuestos_leyton_1`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: moto_repuestos_leyton_1
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(16) NOT NULL,
  `nombre_cliente` varchar(30) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'123-456-7890A','Jua','Pérez','8888-9999'),(2,'987-654-3210B','María','Gómez','8888-5678'),(3,'123-456-7890A','Juan','Pérez','8888-1234'),(4,'987-654-3210B','María','Gómez','8888-5678'),(8,'1212309051002A','steven','lazo','12304566');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `fecha_compra` datetime NOT NULL,
  `id_proveedor` int NOT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `fk_proveedor_compra` (`id_proveedor`),
  CONSTRAINT `fk_proveedor_compra` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_prov`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (3,'2024-07-01 10:00:00',1),(4,'2024-07-02 15:00:00',2),(5,'2024-07-01 10:00:00',1),(6,'2024-07-02 15:00:00',2),(7,'2024-07-01 10:00:00',1),(8,'2024-07-02 15:00:00',2),(10,'2025-05-03 03:58:51',8);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `id_detalle_compra` int NOT NULL AUTO_INCREMENT,
  `precio_unitario` float NOT NULL,
  `cantidad` int NOT NULL,
  `id_producto` int NOT NULL,
  `id_compra` int NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id_detalle_compra`),
  KEY `fk_producto_compra` (`id_producto`),
  KEY `fk_compra_detalle` (`id_compra`),
  CONSTRAINT `fk_compra_detalle` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id_compra`) ON DELETE CASCADE,
  CONSTRAINT `fk_producto_compra` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
INSERT INTO `detalle_compra` VALUES (3,175,10,1,3,2012.5),(4,50,5,2,4,287.5),(5,175,10,1,3,2012.5),(6,50,5,2,4,287.5),(7,175,10,1,3,2012.5),(8,50,5,2,4,287.5),(10,8,10,7,10,80);
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `id_detalle_venta` int NOT NULL AUTO_INCREMENT,
  `precio_unitario` float NOT NULL,
  `cantidad` int NOT NULL,
  `id_producto` int NOT NULL,
  `id_venta` int NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id_detalle_venta`),
  KEY `fk_venta_detalle` (`id_venta`),
  KEY `fk_producto_detalle` (`id_producto`),
  CONSTRAINT `fk_producto_detalle` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `fk_venta_detalle` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES (9,10.5,10,7,9,105),(10,220,2,1,10,440),(19,200,10,1,1,2000),(20,100,1,2,2,100),(24,220,10,1,11,2200);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id_marca` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(30) NOT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Suzuki'),(2,'Yamaha'),(3,'Hondas'),(4,'Yamaha'),(5,'Honda'),(8,'Genesis');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_` varchar(50) NOT NULL,
  `modelo` varchar(40) NOT NULL,
  `precio_venta` float NOT NULL,
  `precio_compra` float NOT NULL,
  `stock` int NOT NULL,
  `id_marca` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_marca` (`id_marca`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Cable Acelerador','Navi',220,175,28,1),(2,'Aceite','Havoline',100,50,5,2),(3,'Cable Acelerador','Navi',200,175,30,1),(4,'Aceite','Havoline',100,50,4,2),(5,'Cable Acelerador','Navi',200,175,30,1),(6,'Aceite','Havoline',100,50,4,2),(7,'Producto Ejemplo','Modelo 123',10.5,8,90,1),(8,'pide vias','150',1500,1000,1000,5),(11,'Disco Freno','150',555,500,1,5);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_prov` int NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `empresa` varchar(100) NOT NULL,
  PRIMARY KEY (`id_prov`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Carlos','111-222-3333','Bajaj'),(2,'Proveedor B','987-654-3210','Susuki'),(3,'Proveedor A','123-456-7890','Bajaj'),(4,'Proveedor B','987-654-3210','Susuki'),(5,'Proveedor A','123-456-7890','Bajaj'),(6,'Proveedor B','987-654-3210','Susuki'),(7,'Proveedor C','89262526','Honda'),(8,'Juan Perez','2323-8956','Honda'),(9,'Proveedor C','89262526','Honda');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario` varchar(30) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('admin','newpass');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `fecha_venta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `fk_cliente_venta` (`id_cliente`),
  CONSTRAINT `fk_cliente_venta` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (1,'2024-05-09 12:00:00',8),(2,'2024-05-07 21:00:00',4),(3,'2024-05-06 10:00:00',1),(4,'2024-05-07 15:00:00',2),(5,'2024-05-06 10:00:00',1),(6,'2024-05-07 15:00:00',2),(9,'2025-05-05 17:08:05',4),(10,'2025-05-05 18:42:33',8),(11,'2025-05-07 09:53:24',3);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'moto_repuestos_leyton_1'
--

--
-- Dumping routines for database 'moto_repuestos_leyton_1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-07 16:48:46
