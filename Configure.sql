
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Creating a database
--

CREATE DATABASE `mat_quiz_db`;

--
-- Table structure for table `part_user`
--

CREATE TABLE `mat_quiz_db`.`part_user` (
  `uid` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `regno` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Table structure for table `quiz_list`
--

CREATE TABLE `mat_quiz_db`.`quiz_list` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `descr` varchar(200) NOT NULL,
  `level` varchar(20) NOT NULL,
  `conducted_by` varchar(40) NOT NULL,
  `hours` int(10) NOT NULL,
  `mins` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Table structure for table `questions`
--

CREATE TABLE `mat_quiz_db`.`quiz_questions` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `q_id` int(4) NOT NULL,
  `question` varchar(20) NOT NULL,
  `op_a` varchar(20) NOT NULL,
  `op_b` varchar(20) NOT NULL,
  `op_c` varchar(20) NOT NULL,
  `op_d` varchar(20) NOT NULL,
  `result` varchar(200) NOT NULL,
  `marks` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;


--
-- Table structure for table `results`
--

CREATE TABLE `mat_quiz_db`.`quiz_results` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `u_id` int(4) NOT NULL,
  `q_id` int(4) NOT NULL,
  `attended_ques` int(200) NOT NULL,
  `unattended_ques` int(20) NOT NULL,
  `marks` int(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

