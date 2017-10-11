-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 11, 2017 at 10:05 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mat_quiz_db`
--
CREATE DATABASE IF NOT EXISTS `mat_quiz_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mat_quiz_db`;

-- --------------------------------------------------------

--
-- Table structure for table `part_user`
--

CREATE TABLE `part_user` (
  `uid` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `regno` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_list`
--

CREATE TABLE `quiz_list` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `descr` varchar(200) NOT NULL,
  `level` varchar(20) NOT NULL,
  `conducted_by` varchar(40) NOT NULL,
  `hours` int(10) NOT NULL,
  `mins` int(11) NOT NULL,
  `negative_mark` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `q_id` int(4) NOT NULL,
  `question` varchar(20) NOT NULL,
  `op_a` varchar(20) NOT NULL,
  `op_b` varchar(20) NOT NULL,
  `op_c` varchar(20) NOT NULL,
  `op_d` varchar(20) NOT NULL,
  `result` varchar(200) NOT NULL,
  `marks` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_results`
--

CREATE TABLE `quiz_results` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `u_id` int(4) NOT NULL,
  `q_id` int(4) NOT NULL,
  `attended_ques` int(200) NOT NULL,
  `unattended_ques` int(20) NOT NULL,
  `marks` int(40) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
