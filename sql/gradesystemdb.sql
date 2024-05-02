-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: grade_system_dbms
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `belongs_to`
--

DROP TABLE IF EXISTS `belongs_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `belongs_to` (
  `Dname` varchar(255) NOT NULL,
  `Course_Num` varchar(255) NOT NULL,
  PRIMARY KEY (`Dname`,`Course_Num`),
  KEY `FK_CNUM` (`Course_Num`),
  CONSTRAINT `belongs_to_ibfk_1` FOREIGN KEY (`Dname`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_CNUM` FOREIGN KEY (`Course_Num`) REFERENCES `course` (`Course_Number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belongs_to`
--

LOCK TABLES `belongs_to` WRITE;
/*!40000 ALTER TABLE `belongs_to` DISABLE KEYS */;
INSERT INTO `belongs_to` VALUES ('Computer Science','CS 1114'),('Computer Science','CS 2104'),('Computer Science','CS 2114'),('Computer Science','CS 2505'),('Computer Science','CS 2506'),('Computer Science','CS 3114'),('Computer Science','CS 3214'),('Computer Science','CS 3274'),('Computer Science','CS 3304'),('Computer Science','CS 3604'),('Computer Science','CS 3714'),('Computer Science','CS 3724'),('Computer Science','CS 3754'),('Computer Science','CS 4104'),('Computer Science','CS 4114'),('Computer Science','CS 4124'),('Computer Science','CS 4254'),('Computer Science','CS 4264'),('Computer Science','CS 4804'),('Computer Science','CS 4824');
/*!40000 ALTER TABLE `belongs_to` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `Course_Number` varchar(255) NOT NULL,
  `Prerequisites` varchar(255) NOT NULL,
  `Departments` varchar(255) NOT NULL,
  `CGPA_Value` double(4,2) NOT NULL,
  PRIMARY KEY (`Course_Number`,`Prerequisites`),
  KEY `course_ibfk_1` (`CGPA_Value`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`CGPA_Value`) REFERENCES `gpa` (`GPA_Value`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('CS 1114','None','Computer Science',2.34),('CS 2104','CS 1114','Computer Science',3.50),('CS 2104','MATH 1205','Computer Science',3.50),('CS 2104','MATH 1225','Computer Science',3.50),('CS 2104','MATH 1526','Computer Science',3.50),('CS 2114','CS 1114','Computer Science',3.04),('CS 2505','CS 2114','Computer Science',3.31),('CS 2506','CS 2505','Computer Science',3.01),('CS 2506','MATH 2534','Computer Science',3.01),('CS 2506','MATH 3034','Computer Science',3.01),('CS 3114','CS 2505','Computer Science',3.40),('CS 3214','CS 2506','Computer Science',3.05),('CS 3214','ECE 2564','Computer Science',3.05),('CS 3214','ECE 3574','Computer Science',3.05),('CS 3274','CS 2506','Computer Science',3.15),('CS 3304','CS 3114','Computer Science',3.17),('CS 3604','COMM 2004','Computer Science',3.93),('CS 3604','CS 2114','Computer Science',3.93),('CS 3704','CS 3114','Computer Science',3.84),('CS 3714','CS 2114','Computer Science',3.46),('CS 3724','CS 1114','Computer Science',3.65),('CS 3744','CS 2114','Computer Science',3.72),('CS 3754','CS 2114','Computer Science',3.74),('CS 4104','CS 3114','Computer Science',3.26),('CS 4114','MATH 3134','Computer Science',3.60),('CS 4124','Math 3134','Computer Science',2.44),('CS 4254','CS 3214','Computer Science',3.27),('CS 4264','CS 3214','Computer Science',3.31),('CS 4804','CS 3114','Computer Science',3.25),('CS 4824','CS 2114','Computer Science',3.66),('test update','None','Computer Science',4.00);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `declares`
--

DROP TABLE IF EXISTS `declares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declares` (
  `Stud_ID` int NOT NULL,
  `Maj_Name` varchar(255) NOT NULL,
  `Min_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Stud_ID`,`Maj_Name`,`Min_Name`),
  KEY `declares_ibfk_2` (`Maj_Name`),
  KEY `declares_ibfk_3` (`Min_Name`),
  CONSTRAINT `declares_ibfk_2` FOREIGN KEY (`Maj_Name`) REFERENCES `major` (`Major_Name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `declares_ibfk_3` FOREIGN KEY (`Min_Name`) REFERENCES `minor` (`Minor_Name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `stud_id_fk` FOREIGN KEY (`Stud_ID`) REFERENCES `student` (`Student_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declares`
--

LOCK TABLES `declares` WRITE;
/*!40000 ALTER TABLE `declares` DISABLE KEYS */;
INSERT INTO `declares` VALUES (906311114,'Business','None'),(906311115,'Business','None'),(906311130,'Business','None'),(906311160,'Business','Math'),(906311170,'Business','None'),(906311190,'Business','Math'),(906301288,'Chemistry','Literature'),(906311117,'Chemistry','None'),(906311118,'Chemistry','Math'),(906311150,'Chemistry','Math'),(906311116,'Computer Engineering','Computer Science'),(906311111,'Computer Science ','Math'),(906311112,'Computer Science ','None'),(906311113,'Computer Science ','None'),(906311140,'Computer Science ','Math'),(906330999,'Computer Science ','Math'),(906311124,'Math','Computer Science'),(906311180,'Mechnical Engineering','None'),(906311119,'Mining Engineering','None'),(906311120,'Photonics','Math');
/*!40000 ALTER TABLE `declares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Department_Name` varchar(255) NOT NULL,
  `Contact_Info` varchar(255) NOT NULL,
  `Head_ID` int DEFAULT NULL,
  PRIMARY KEY (`Department_Name`),
  KEY `department_ibfk_1` (`Head_ID`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Head_ID`) REFERENCES `instructor` (`Teacher_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('Accounting and Information Systems','acis@vt.edu',906341100),('Animal Sciences','ansci@vt.edu',906344000),('Biochemistry','arasor@vt.edu',906342000),('Biomedical Sciences and Pathobiology','amanda1@vt.edu',906341200),('Business Information Technology','bit@vt.edu',906341400),('Chemistry','chemadv-resc@exchange.vt.edu',906341000),('Civil and Environmental Engineering','karalatt@vt.edu',906346000),('Computational Modeling and Data Analytics','cmda@vt.edu',906341500),('Computer Science','csundergrad@cs.vt.edu',906340000),('Data Science','vtdatascience@vt.edu',906341600),('Economics','eperdue@vt.edu',906349000),('Electrical and Computer Engineering','atkins@vt.edu',906343000),('English','english_department@vt.edu',906341700),('Food Science and Technology','fstinfo@vt.edu',906341300),('History','sgranzetto@vt.edu',906341210),('Mathematics','math@math.vt.edu',906348000),('Mechanical Engineering','murfvt@vt.edu',906345000),('Mining and Minerals Engineering','mineinfo@vt.edu',906347000),('Philosophy','clahs_phil@vt.edu',906341800),('Political Science','khedge@vt.edu',906341220),('Sociology','soc@vt.edu',906341900);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gpa`
--

DROP TABLE IF EXISTS `gpa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gpa` (
  `GPA_Value` double(4,2) NOT NULL,
  PRIMARY KEY (`GPA_Value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gpa`
--

LOCK TABLES `gpa` WRITE;
/*!40000 ALTER TABLE `gpa` DISABLE KEYS */;
INSERT INTO `gpa` VALUES (2.00),(2.34),(2.44),(2.45),(2.50),(2.60),(2.70),(3.01),(3.04),(3.05),(3.15),(3.17),(3.20),(3.25),(3.26),(3.27),(3.31),(3.40),(3.46),(3.47),(3.50),(3.55),(3.56),(3.60),(3.65),(3.66),(3.70),(3.72),(3.74),(3.78),(3.80),(3.84),(3.85),(3.90),(3.91),(3.92),(3.93),(3.95),(4.00);
/*!40000 ALTER TABLE `gpa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `Teacher_ID` int NOT NULL,
  `Instructor_Name` varchar(255) NOT NULL,
  `Inst_Dep` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Teacher_ID`),
  KEY `fk_inst_dep` (`Inst_Dep`),
  CONSTRAINT `fk_inst_dep` FOREIGN KEY (`Inst_Dep`) REFERENCES `department` (`Department_Name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (111222333,'test test','Computer Science'),(123456789,'test update instructor','Computer Science'),(906340000,'Cal Ribbens','Computer Science'),(906341000,'Amanda Morris','Chemistry'),(906341100,'Robert Davidson','Accounting and Information Systems'),(906341200,'Margie Lee','Biomedical Sciences and Pathobiology'),(906341210,'Jennifer Hart','History'),(906341220,'Timothy Luke','Political Science'),(906341230,'Godmar Back','Computer Science'),(906341240,'David McPherson','Computer Science'),(906341250,'Dimitrios Nikolopoulos','Computer Science'),(906341260,'Daniel Dunlap','Computer Science'),(906341270,'Bo Ji','Computer Science'),(906341280,'Sharath Raghvendra','Computer Science'),(906341290,'Allyson Senger','Computer Science'),(906341300,'Renee Boyer','Food Science and Technology'),(906341330,'Patrick Sullivan','Computer Science'),(906341340,'John Wenskovitch','Computer Science'),(906341350,'Dan Williams','Computer Science'),(906341360,'Ali Butt','Computer Science'),(906341370,'Onyeka Emebo','Computer Science'),(906341380,'Lenwood Heath','Computer Science'),(906341400,'Quinton Nottingham','Business Information Technology'),(906341500,'Mark Embree','Computational Modeling and Data Analytics'),(906341600,'Tom Woteki','Data Science'),(906341700,'Ashley Reed','English'),(906341800,'Kelly Trogdon','Philosophy'),(906341900,'Jennifer Johnson','Sociology'),(906342000,'Stefan Roberts','Biochemistry'),(906343000,'Luke Lester','Electrical and Computer Engineering'),(906344000,'David Gerrard','Animal Sciences'),(906345000,'Scott Huxtable','Mechanical Engineering'),(906346000,'Mark Widdowson','Civil and Environmental Engineering'),(906347000,'Aaron Noble','Mining and Minerals Engineering'),(906348000,'Sarah Reznikoff','Mathematics'),(906349000,'Jadrian Wooten','Economics');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Account_Type` varchar(255) NOT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('teststudent@gmail.com','123','Student');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major` (
  `Major_Name` varchar(255) NOT NULL,
  `Major_Dep` varchar(255) NOT NULL,
  PRIMARY KEY (`Major_Name`),
  KEY `major_ibfk_1` (`Major_Dep`),
  CONSTRAINT `major_ibfk_1` FOREIGN KEY (`Major_Dep`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES ('Accounting','Accounting and Information Systems'),('Accounting and Information Systems Audit','Accounting and Information Systems'),('Cybersecurity Management and Analytics','Business Information Technology'),('Decision Support System','Business Information Technology'),('Operation Supply Chain Management','Business Information Technology'),('Chemistry','Chemistry'),('Civil Engineering','Civil and Environmental Engineering'),('Computer Science ','Computer Science'),('Data Centric Computing','Computer Science'),('Secure Computing','Computer Science'),('test2','Computer Science'),('Business','Economics'),('Chip-Scale Integration','Electrical and Computer Engineering'),('Communications and Networking','Electrical and Computer Engineering'),('Computer Engineering','Electrical and Computer Engineering'),('Machine Learning','Electrical and Computer Engineering'),('Photonics','Electrical and Computer Engineering'),('Food Science','Food Science and Technology'),('Math','Mathematics'),('Automotive Engineering','Mechanical Engineering'),('Mechnical Engineering','Mechanical Engineering'),('Robotics and Mechatronics','Mechanical Engineering'),('Mining Engineering','Mining and Minerals Engineering');
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minor`
--

DROP TABLE IF EXISTS `minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minor` (
  `Minor_Name` varchar(255) NOT NULL,
  `Minor_Dep` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Minor_Name`),
  KEY `minor_ibfk_1` (`Minor_Dep`),
  CONSTRAINT `minor_ibfk_1` FOREIGN KEY (`Minor_Dep`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minor`
--

LOCK TABLES `minor` WRITE;
/*!40000 ALTER TABLE `minor` DISABLE KEYS */;
INSERT INTO `minor` VALUES ('None',NULL),('Chemistry','Chemistry'),('Computer Science','Computer Science'),('Cyber Security','Computer Science'),('Human Computer Interaction','Computer Science'),('Creative Writing','English'),('Literature','English'),('Food Science','Food Science and Technology'),('War and Society','History'),('Math','Mathematics'),('testing add minor','Mathematics'),('Nuclear Engineering','Mechanical Engineering'),('Philosohpy','Philosophy'),('European Engagement','Political Science'),('European Studies','Political Science'),('Global Engagement','Political Science'),('International Public Policy','Political Science'),('International Relations','Political Science'),('International Studies','Political Science'),('Professional and Technical Writing','Political Science'),('Transatlantic Studies','Political Science'),('Sociology','Sociology');
/*!40000 ALTER TABLE `minor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `Student_ID` int NOT NULL,
  `Student_Name` varchar(255) NOT NULL,
  `Major` varchar(255) NOT NULL,
  `Minor` varchar(255) NOT NULL,
  `Year` varchar(255) NOT NULL,
  `SGPA_Value` double(4,2) NOT NULL,
  PRIMARY KEY (`Student_ID`,`Major`,`Minor`),
  KEY `student_ibfk_1` (`SGPA_Value`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`SGPA_Value`) REFERENCES `gpa` (`GPA_Value`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (906301288,'King Whopper','Chemistry','Literature','Sophmore',4.00),(906311111,'John Doe','Computer Science','Math','Senior',3.80),(906311112,'Jane Doe','Computer Science','None','Senior',3.56),(906311113,'Wendy FourFour','Computer Science','None','Freshman',3.40),(906311114,'John Jobless','Computer Science','Math','Senior',3.85),(906311115,'Jim Beam','Business','None','Senior',3.85),(906311116,'Moe Burrito','Computer Engineering','Computer Science','Sophmore',3.20),(906311117,'Ronald Mcdonald','Chemistry','None','Sophmore',3.55),(906311118,'John Deer','Chemistry','Math','Sophmore',3.70),(906311119,'Samantha White','Mining Engineering','None','Sophmore',3.20),(906311120,'Sammy Hardys','Photonics','Math','Freshman',3.47),(906311124,'Taco Bells','Math','Computer Science','Junior',3.70),(906311130,'Homer Simpson','Business','None','Freshman',2.70),(906311140,'Baja Blasts','Computer Science','Math','Senior',3.78),(906311150,'Olives Garden','Chemistry','Math','Senior',3.78),(906311160,'Ham Burg','Business','Math','Freshman',2.45),(906311170,'Tammy Tam','Business','None','Freshman',3.46),(906311180,'Ham Sammy','Mechanical Engineering','None','Senior',2.70),(906311190,'Tim Sands','Business','Math','Senior',4.00),(906330999,'Mac Big','Computer Science','Math','Junior',4.00);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taught_by`
--

DROP TABLE IF EXISTS `taught_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taught_by` (
  `C_Num` varchar(255) NOT NULL,
  `Teach_ID` int NOT NULL,
  PRIMARY KEY (`C_Num`,`Teach_ID`),
  KEY `taught_by_ibfk_2` (`Teach_ID`),
  CONSTRAINT `taught_by_ibfk_1` FOREIGN KEY (`C_Num`) REFERENCES `course` (`Course_Number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `taught_by_ibfk_2` FOREIGN KEY (`Teach_ID`) REFERENCES `instructor` (`Teacher_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taught_by`
--

LOCK TABLES `taught_by` WRITE;
/*!40000 ALTER TABLE `taught_by` DISABLE KEYS */;
INSERT INTO `taught_by` VALUES ('test update',123456789),('CS 3214',906341230),('CS 1114',906341240),('CS 2505',906341240),('CS 3304',906341240),('CS 2506',906341250),('CS 3604',906341260),('CS 4104',906341270),('CS 3114',906341280),('CS 4104',906341280),('CS 1114',906341290),('CS 2505',906341290),('CS 2114',906341330),('CS 3114',906341330),('CS 2506',906341340),('CS 3214',906341350),('CS 3214',906341360),('CS 2104',906341370),('CS 2114',906341370),('CS 3304',906341370),('CS 4114',906341380);
/*!40000 ALTER TABLE `taught_by` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12  3:31:52
