-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9a203.p.ssafy.io    Database: showeat
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` datetime(6) NOT NULL,
  `notification_is_checked` bit(1) NOT NULL,
  `notification_message` varchar(255) NOT NULL,
  `notification_sent` bit(1) NOT NULL,
  `notification_type` varchar(255) NOT NULL,
  `coupon_id` bigint DEFAULT NULL,
  `funding_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FKmp92n2xxxjnni16fvwp6rik34` (`coupon_id`),
  KEY `FKns8r98u29e33tbbg5i63nqrqv` (`funding_id`),
  KEY `FKb0yvoep4h4k92ipon31wmdf7e` (`user_id`),
  CONSTRAINT `FKb0yvoep4h4k92ipon31wmdf7e` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmp92n2xxxjnni16fvwp6rik34` FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`coupon_id`),
  CONSTRAINT `FKns8r98u29e33tbbg5i63nqrqv` FOREIGN KEY (`funding_id`) REFERENCES `funding` (`funding_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (6,'2023-11-14 16:07:31.078981','2023-11-14 16:07:33.376391',_binary '','asperiores 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 15일',_binary '','COUPON_CREATE',1849,561,103),(7,'2023-11-14 16:07:33.376391','2023-11-15 09:55:03.353470',_binary '','asperiores 쿠폰이 도착했습니다! ',_binary '','COUPON_CREATE',1849,561,106),(8,'2023-11-15 14:13:59.740568','2023-11-15 14:14:03.225915',_binary '','대창 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 16일',_binary '','COUPON_CREATE',1855,565,106),(9,'2023-11-15 14:22:59.764108','2023-11-15 14:23:02.196190',_binary '','대창 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 16일',_binary '','COUPON_CREATE',1856,567,106),(10,'2023-11-15 14:55:23.329288','2023-11-15 14:55:33.504461',_binary '','대창과 오므라이스 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 16일',_binary '','COUPON_CREATE',1857,568,106),(11,'2023-11-15 14:55:23.335354','2023-11-15 14:55:33.526586',_binary '','대창과 오므라이스 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 16일',_binary '','COUPON_CREATE',1858,568,103),(12,'2023-11-15 16:08:38.437283','2023-11-15 17:21:21.859704',_binary '\0','대창 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 16일',_binary '','COUPON_CREATE',1859,569,104),(13,'2023-11-16 10:05:43.637522','2023-11-16 10:20:36.459952',_binary '','하아아아노이 분짜 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 17일',_binary '','COUPON_CREATE',1860,621,107),(14,'2023-11-16 11:19:55.871379','2023-11-16 13:51:46.502277',_binary '','테스트 얍 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 17일',_binary '','COUPON_CREATE',1861,630,107),(15,'2023-11-16 13:47:10.176549','2023-11-16 13:51:46.579650',_binary '','비빔밥 쿠폰이 도착했습니다! \n사용기한: 2023년 11월 17일',_binary '','COUPON_CREATE',1862,635,106),(16,'2023-11-16 14:00:50.519369','2023-11-16 14:08:53.067359',_binary '','문수정고객님, 구매하신 쑈잇 쿠폰이 도착했습니다. \n■가게명 : (주)나이스커피시스템\n■쿠폰명 : 비빔밥\n■사용기한 : 2023년 11월 17일',_binary '','COUPON_CREATE',1863,635,106),(17,'2023-11-16 14:50:05.370359','2023-11-16 15:09:01.903216',_binary '','오유정고객님, 구매하신 쑈잇 쿠폰이 도착했습니다.\n \n■ 가게명 : 소소잇\n■ 메뉴명 : 싱싱한 초밥세트\n■ 사용기한 : 2023년 11월 17일',_binary '','COUPON_CREATE',1864,639,105),(18,'2023-11-16 14:53:42.156930','2023-11-16 15:09:01.959633',_binary '','오유정고객님, 구매하신 쑈잇 쿠폰이 도착했습니다.\n \n■ 가게명 : 소소잇\n■ 메뉴명 : 싱싱한 초밥세트\n■ 사용기한 : 2023년 11월 17일',_binary '','COUPON_CREATE',1865,639,105),(19,'2023-11-16 17:12:04.012077','2023-11-16 17:12:04.012077',_binary '','탑건고객님, 구매하신 쑈잇 쿠폰이 도착했습니다.\n \n■ 가게명 : 오늘의 밥\n■ 메뉴명 : 오늘의 텐동\n■ 사용기한 : 2023년 11월 17일',_binary '\0','COUPON_CREATE',1866,650,111);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 17:37:46
