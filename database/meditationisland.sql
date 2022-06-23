-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 23 jun 2022 om 15:37
-- Serverversie: 10.4.21-MariaDB
-- PHP-versie: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meditationisland`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `players`
--

CREATE TABLE `players` (
  `id` int(9) NOT NULL,
  `name` varchar(3) NOT NULL,
  `score` int(9) NOT NULL,
  `player_id` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `players`
--

INSERT INTO `players` (`id`, `name`, `score`, `player_id`) VALUES
(1228, 'jak', 3, 0),
(1230, 'ROW', 1, 0),
(1231, '222', 5, 0),
(1232, '333', 1, 0),
(1233, 'jan', 5, 0),
(1234, 'jul', 5, 0),
(1235, 'roe', 5, 0),
(1236, 'flp', 5, 0),
(1237, 'www', 5, 0),
(1238, 'jul', 6, 0),
(1239, 'xnb', 6, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `score`
--

CREATE TABLE `score` (
  `id` int(10) NOT NULL,
  `player_id` int(10) NOT NULL,
  `score` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `players`
--
ALTER TABLE `players`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1240;

--
-- AUTO_INCREMENT voor een tabel `score`
--
ALTER TABLE `score`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
