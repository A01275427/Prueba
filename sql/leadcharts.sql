-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 14, 2023 at 03:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leadcharts`
--

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `idLead` int(11) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `gain` float DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `creationTime` time DEFAULT NULL,
  `firstMessageDate` date DEFAULT NULL,
  `firstMessageTime` time DEFAULT NULL,
  `firstMessage` text DEFAULT NULL,
  `lastMessageDate` date DEFAULT NULL,
  `lastMessageTime` time DEFAULT NULL,
  `lastMessage` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `leadStatus` varchar(255) DEFAULT NULL,
  `assignedTo` varchar(255) DEFAULT NULL,
  `pipe` varchar(255) DEFAULT NULL,
  `stage` varchar(255) DEFAULT NULL,
  `archived` varchar(10) DEFAULT NULL,
  `manuallyCreated` varchar(10) DEFAULT NULL,
  `leadTeam` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leadsreports`
--

CREATE TABLE `leadsreports` (
  `idLead` int(11) NOT NULL,
  `idReport` int(11) NOT NULL,
  `dateLeadReport` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `priviledges`
--

CREATE TABLE `priviledges` (
  `idPriviledge` int(4) NOT NULL,
  `namePriviledge` varchar(30) NOT NULL,
  `descriptionPriviledge` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `priviledges`
--

INSERT INTO `priviledges` (`idPriviledge`, `namePriviledge`, `descriptionPriviledge`) VALUES
(1, 'canUpload', 'With this privilege, the user can upload a csv.'),
(2, 'canConsultUsers', 'With this privilege, the user can consult the users registered in the database.'),
(3, 'canConsultReports', 'With this privilege, the user can consult the users registered in the database.'),
(4, 'canAddUser', ''),
(5, 'canDeleteUser', ''),
(6, 'canDownloadPDF', ''),
(7, 'canSeeUsers', '');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `idReport` int(11) NOT NULL,
  `nameReport` varchar(30) NOT NULL,
  `descriptionReport` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `idRole` int(3) NOT NULL,
  `nameRole` varchar(30) NOT NULL,
  `descriptionRole` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idRole`, `nameRole`, `descriptionRole`) VALUES
(1, 'Owner', 'Es el rol que puede crear usuarios y tiene acceso a todo.'),
(2, 'Administrador', 'Tiene los mismos privilegios que el owner, pero no puede registrar usuarios'),
(3, 'Seller', 'Un rol en el que solo se pueden consultar leads y consultar reportes');

-- --------------------------------------------------------

--
-- Table structure for table `rolespriviledges`
--

CREATE TABLE `rolespriviledges` (
  `idRole` int(11) NOT NULL,
  `idPriviledge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rolespriviledges`
--

INSERT INTO `rolespriviledges` (`idRole`, `idPriviledge`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 6),
(3, 1),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nameUser` varchar(100) NOT NULL,
  `lastNameUser` varchar(100) NOT NULL,
  `emailUser` varchar(80) NOT NULL,
  `passwordUser` varchar(128) NOT NULL,
  `team` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `nameUser`, `lastNameUser`, `emailUser`, `passwordUser`, `team`) VALUES
(41, 'prueba', 'prueba', 'prueba@gmail.com', '$2a$12$KMSPkND/LrcJVCX67YKtPuXruCFfxn/LizA633I2qFZDQcwje9BuW', 'prueba@gmail.com'),
(42, 'prueba2', 'prueba2', 'prueba2@gmail.com', '$2a$12$xQt03fnoqUqW6vIgA/FocOFcbSg79QDLuN3dNvXWaDGLsSlP6xkBu', 'prueba@gmail.com'),
(43, 'prueba3', 'prueba3', 'prueba3@gmail.com', '$2a$12$XBz6H1Bx1f6lHiOPI3g9quL6uAtjmIXxt6vg8TJf73uO7f.QO7MaK', 'prueba@gmail.com'),
(44, 'ivan123', 'ivan', 'ivan@tec.mx', '$2a$12$VJe4Ko6VxKdziiL575aJruqPpRKCo8YKLr0CZpPziUxydAGFuymJ6', 'prueba@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `usersleads`
--

CREATE TABLE `usersleads` (
  `idUser` int(11) NOT NULL,
  `idLead` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usersroles`
--

CREATE TABLE `usersroles` (
  `idUser` int(11) NOT NULL,
  `idRole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usersroles`
--

INSERT INTO `usersroles` (`idUser`, `idRole`) VALUES
(41, 1),
(42, 2),
(43, 3),
(44, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`idLead`);

--
-- Indexes for table `leadsreports`
--
ALTER TABLE `leadsreports`
  ADD PRIMARY KEY (`idLead`,`idReport`),
  ADD KEY `idReport` (`idReport`);

--
-- Indexes for table `priviledges`
--
ALTER TABLE `priviledges`
  ADD PRIMARY KEY (`idPriviledge`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`idReport`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRole`);

--
-- Indexes for table `rolespriviledges`
--
ALTER TABLE `rolespriviledges`
  ADD PRIMARY KEY (`idRole`,`idPriviledge`),
  ADD KEY `idPriviledge` (`idPriviledge`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `usersleads`
--
ALTER TABLE `usersleads`
  ADD PRIMARY KEY (`idUser`,`idLead`),
  ADD KEY `idLead` (`idLead`);

--
-- Indexes for table `usersroles`
--
ALTER TABLE `usersroles`
  ADD PRIMARY KEY (`idUser`,`idRole`),
  ADD KEY `idRole` (`idRole`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `idLead` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=393343;

--
-- AUTO_INCREMENT for table `priviledges`
--
ALTER TABLE `priviledges`
  MODIFY `idPriviledge` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `idReport` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRole` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leadsreports`
--
ALTER TABLE `leadsreports`
  ADD CONSTRAINT `leadsreports_ibfk_1` FOREIGN KEY (`idLead`) REFERENCES `leads` (`idLead`),
  ADD CONSTRAINT `leadsreports_ibfk_2` FOREIGN KEY (`idReport`) REFERENCES `reports` (`idReport`);

--
-- Constraints for table `rolespriviledges`
--
ALTER TABLE `rolespriviledges`
  ADD CONSTRAINT `rolespriviledges_ibfk_1` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE,
  ADD CONSTRAINT `rolespriviledges_ibfk_2` FOREIGN KEY (`idPriviledge`) REFERENCES `priviledges` (`idPriviledge`);

--
-- Constraints for table `usersleads`
--
ALTER TABLE `usersleads`
  ADD CONSTRAINT `usersleads_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `usersleads_ibfk_2` FOREIGN KEY (`idLead`) REFERENCES `leads` (`idLead`);

--
-- Constraints for table `usersroles`
--
ALTER TABLE `usersroles`
  ADD CONSTRAINT `usersroles_ibfk_2` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
