-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: disney_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `character_movie`
--

DROP TABLE IF EXISTS `character_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `character_id` (`character_id`),
  CONSTRAINT `character_movie_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  CONSTRAINT `character_movie_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_movie`
--

LOCK TABLES `character_movie` WRITE;
/*!40000 ALTER TABLE `character_movie` DISABLE KEYS */;
INSERT INTO `character_movie` VALUES (1,17,1),(2,17,2),(3,17,3),(4,19,4),(5,19,5);
/*!40000 ALTER TABLE `character_movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `age` int(11) DEFAULT NULL,
  `history` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `image` text COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (16,'Minnie Mouse',94,'Minnie Mouse es un personaje de dibujos animados, de los estudios Walt Disney Pictures. Es la eterna novia de Mickey Mouse y junto a él debutó en Plane Crazy, el 15 de mayo de 1928, aunque alcanzó el éxito junto a Mickey en el tercer episodio de ambos, St',20,'https://e7.pngegg.com/pngimages/499/707/png-clipart-minnie-mouse-illustration-minnie-mouse-mickey-mouse-daisy-duck-minnie-cartoon-fictional-character-thumbnail.png'),(17,'Mickey Mouse',94,'Mickey Mouse (también llamado Ratón Mickey) es un personaje de dibujos animados y emblema de la compañía Disney. Creado el 18 de noviembre de 1928, este ratón tiene un origen disputado. La leyenda oficial explica que fue creado por Walt Disney durante un viaje en tren de vuelta a California tras descubrir que no poseía el copyright de Oswald, el conejo afortunado, por lo que concibió un ratoncito vivaz de orejas grandes que quiso llamar Mortimer. A Lilian, su esposa, le pareció un nombre demasiado pretencioso y le sugirió Mickey (según Bob Thomas la leyenda del nombre es ficticia y cita el caso de un personaje llamado Mortimer Mouse que nació en 1936, tío de Minnie Mouse).',20,'https://cronicaglobal.elespanol.com/uploads/s1/39/43/08/8/mickey-mouse.jpeg'),(19,'Simbaa',84,'Simba es el protagonista de la película The Lion King. Hijo de Mufasa y Sarabi, Simba fue el siguiente a su padre en la línea para gobernar las Tierras del Reino. Sin embargo, después de que su malvado tío Scar asesinó a Mufasa y culpó a Simba por la muerte del antiguo rey, el joven cachorro de león es condenado al exilio mientras que Scar gobierna como rey. Fue entonces cuando Simba regresó a las Tierras del Reino y reclamó su trono y lugar legítimo en el gran ciclo de la vida.',59,'https://e7.pngegg.com/pngimages/849/677/png-clipart-lion-king-simba-illustration-simba-nala-kion-lion-mufasa-lion-king-simba-simba-nala.png'),(21,'Simbas',77,NULL,NULL,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'infantil','infantil.jpg'),(2,'aventura','aventura.jpg');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` text COLLATE utf8_spanish_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `release_date` date DEFAULT NULL,
  `qualify` int(11) DEFAULT NULL,
  `genre_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'https://unopeliculas.com/pinel/images/productosv2/54544.jpg','El maravilloso mundo de Mickey Mouse','2020-11-14',3,1),(2,'https://unopeliculas.com/pinel/images/productosv1/26748.jpg','Mickey y los Superpilotos','2017-12-14',2,2),(3,'https://unopeliculas.com/pinel/images/productosv1/37390.jpg','Mickey Mouse: Acampando','2016-02-10',4,2),(4,'https://pics.filmaffinity.com/the_lion_king-983881776-mmed.jpg','El rey león','1994-02-10',2,1),(5,'https://pics.filmaffinity.com/the_lion_king_ii_simba_s_pride-369770418-mmed.jpg','El rey león 2: El tesoro de Simba','1998-06-07',5,2),(7,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg','','0000-00-00',NULL,2),(14,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg','','0000-00-00',NULL,1),(15,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg','dasdasdas','2020-06-21',NULL,2),(16,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg','sdadsddddd','2000-01-01',NULL,2),(17,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg','rerdsd','2000-01-01',NULL,2),(21,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg','sdsds','2012-11-22',NULL,2),(22,'https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg','title','2022-03-30',NULL,1),(24,'https://www.todofondos.net/wp-content/uploads/todofondos-disney7-768x480.jpg','disney','2022-03-30',5,2);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (34,'email@gmail.com','$2b$10$U/lUvmrk7Gie/DYQKAypD.hAYUMVyc.BeYNTroq86Qb6p0CCgaeFi');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'disney_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-19 19:49:29
