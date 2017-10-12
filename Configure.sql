-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 12, 2017 at 10:39 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `mat_quiz_db`
--
CREATE DATABASE IF NOT EXISTS `mat_quiz_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mat_quiz_db`;

-- --------------------------------------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

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
  `mins` int(11) NOT NULL,
  `positive_mark` int(11) NOT NULL,
  `negative_mark` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `mat_quiz_db`.`quiz_questions` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `q_id` int(4) NOT NULL,
  `question` varchar(20) NOT NULL,
  `op_a` varchar(20) NOT NULL,
  `op_b` varchar(20) NOT NULL,
  `op_c` varchar(20) NOT NULL,
  `op_d` varchar(20) NOT NULL,
  `result` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_results`
--

CREATE TABLE `mat_quiz_db`.`quiz_results` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `u_id` int(4) NOT NULL,
  `q_id` int(4) NOT NULL,
  `attended_ques` int(200) NOT NULL,
  `unattended_ques` int(20) NOT NULL,
  `correct_ques` int(11) NOT NULL,
  `wrong_ques` int(11) NOT NULL,
  `marks` int(40) NOT NULL,
  `used_sec` bigint(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;