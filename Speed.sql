CREATE DATABASE  IF NOT EXISTS `sp33d_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp33d_db`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 34.82.149.233    Database: sp33d_db
-- ------------------------------------------------------
-- Server version	8.0.26-google

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '1bf9ff25-f3b3-11ed-a778-42010a400002:1-32852';

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `favorite_user_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `favorite` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_favorite` (`user_id`,`favorite_user_id`),
  KEY `favorite_user_id` (`favorite_user_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`username`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`favorite_user_id`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (8,'sariajina','markajina','2023-05-07 16:08:11',1),(12,'sariajina','charlescab','2023-05-07 16:43:05',1),(14,'charlescab','markajina','2023-05-07 16:59:29',1),(15,'charlescab','sariajina','2023-05-07 17:00:34',0),(16,'markajina','charlescab','2023-05-07 17:01:11',1),(17,'markajina','sariajina','2023-05-07 17:01:15',1),(46,'fadiajina','charlescab','2023-05-09 14:20:55',1),(47,'fadiajina','markajina','2023-05-09 14:21:01',1),(48,'fadiajina','sariajina','2023-05-09 14:21:08',1),(49,'sariajina','fadiajina','2023-05-09 20:14:16',1);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (24,'Car','Brand New Car','Cars',60000,'2023-04-16 15:41:04','markajina'),(25,'Car 2','Brand New Car','Cars',31000,'2023-04-16 15:41:42','markajina'),(26,'Car 3','Brand New Car','Cars',31500,'2023-04-16 15:42:13','markajina'),(27,'Car 4','Brand New Car','Cars',31500,'2023-04-16 15:42:23','markajina'),(35,'Car 5','Testtttt','Cars',30000,'2023-04-23 14:30:05','markajina'),(36,'Tesla','This is a tesla','Cars',50000,'2023-04-23 14:39:02','markajina'),(37,'Toyota','This is a toyota','Cars',30000,'2023-04-23 14:59:18','markajina'),(38,'Celica','Celica','Sedan',25000,'2023-05-07 17:55:15','sariajina'),(39,'supra','supra','Retro',100000,'2023-05-05 17:55:39','charlescab'),(40,'NSX','NSX','Retro',35000,'2023-05-05 20:40:49','sariajina'),(41,'RX-7','Retro RX-7','Retro',50000,'2023-05-05 20:44:53','sariajina'),(42,'Toyota','Camry 2010, 150k miles','Sedan',15000,'2023-05-07 17:46:18','sariajina'),(43,'Nissan Altima','First owned by fadi, now it\'s a salvage because of him','Sedan',13000,'2023-05-09 13:57:04','eddiemartinez'),(44,'Alfa Romeo','low mileage','SUV',45000,'2023-05-09 13:58:34','fadiajina'),(45,'AlfaRomeo ','white, 4 door, fast ','Sport',55000,'2023-05-09 13:59:46','fadiajina'),(46,'Corvette Stingray','Gabe\'s favorite car','Retro',40000,'2023-05-09 19:48:12','sariajina'),(47,'WRX STI 2023','Eddies favorite car','Sport',55000,'2023-05-09 20:13:38','sariajina'),(48,'test car','test','Sedan',25000,'2023-05-11 13:48:57','sariajina'),(49,'test','test','Sedan',10000,'2023-05-11 13:50:19','sariajina'),(50,'test','test','Sedan',15000,'2023-05-11 13:51:19','markajina');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `reviewer_username` varchar(255) NOT NULL,
  `rating` enum('excellent','good','fair','poor') NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `item_id` (`item_id`),
  KEY `reviewer_username` (`reviewer_username`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`reviewer_username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,25,'sariajina','poor','Test','2023-04-23 14:23:57'),(2,26,'sariajina','poor','Test 2','2023-04-23 14:24:58'),(3,24,'sariajina','poor','Test 3','2023-04-23 14:25:13'),(4,27,'sariajina','poor','test 4','2023-04-23 14:26:01'),(6,35,'sariajina','poor','Tset','2023-04-23 14:30:29'),(7,35,'sariajina','poor','Tset','2023-04-23 14:31:38'),(8,37,'charlescab','excellent','This is a great item','2023-04-23 15:01:14'),(9,24,'poorreviews','excellent','this is poor','2023-05-05 17:44:37'),(10,24,'poorreviews','poor','this is poor','2023-05-05 17:44:38'),(11,36,'poorreviews','poor','too expensive','2023-05-05 17:45:05'),(12,38,'charlescab','poor','love it!','2023-05-05 17:56:22'),(13,39,'sariajina','poor','Supraaaa!','2023-05-05 17:56:46'),(18,26,'sariajina','poor','test excellent','2023-05-09 19:26:41'),(19,39,'markajina','poor','test','2023-05-11 13:54:32'),(20,39,'markajina','excellent','test','2023-05-11 13:54:33'),(21,39,'markajina','excellent','test','2023-05-11 13:54:35'),(22,25,'sariajina','poor','Poor rev','2023-05-11 13:57:28');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('charlescab','$2b$10$JUzwhIY8L7Cdv20BGZTWPe8Di8ejQHeGUoWn2mzR7gsI0sjLvCDPi','Charles','Cab','charlescab@gmail.com'),('eddiemartinez','$2b$10$ub1slqo6nXjTtZLdsrsmJO1Yeh2Quy1XIYuXpGsBDOWLGXLk5ZRC.','eddie','martinez','eddie@gmail.com'),('fadiajina','$2b$10$IqX0NEnZVXjcO6s/e9ckEOCgjH.OUxwl8ghR/N31itGg2F7Sbav4G','fadi','ajina','fadi@gmail.com'),('johndoe','$2b$10$v.PYihmmMeHZw.Nk2fiu2eVyMD6TI/SPl8cROc2lC2xshQpoTRFyy','John','Doe','johndoe@gmail.com'),('markajina','$2b$10$4wCvZu.6TtjTi0IR8h/v5.ORtRGktSmkUcX1XdipRB5wTjRvm0KPq','Mark','Ajina','markajina@gmail.com'),('poorreviews','$2b$10$lChVIoWlwqlzq3emCoySlOI5SG0p/j8pGgUuI6xobCAhnKc6z16.K','Poor','Reviews','poorreviews@gmail.com'),('sariajina','$2b$10$PDjCJaRfqVgk7ASnTOZOsuo4HfhtxrXVURH1C277f7gAuoOf6gyT6','sari','ajina','sariajina@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17 21:12:15
