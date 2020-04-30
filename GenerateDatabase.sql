-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           10.3.7-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para moviereferences
CREATE DATABASE IF NOT EXISTS `moviereferences` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `moviereferences`;

-- Copiando estrutura para tabela moviereferences.actors
CREATE TABLE IF NOT EXISTS `actors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela moviereferences.actors: ~3 rows (aproximadamente)
DELETE FROM `actors`;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;

-- Copiando estrutura para tabela moviereferences.directors
CREATE TABLE IF NOT EXISTS `directors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela moviereferences.directors: ~6 rows (aproximadamente)
DELETE FROM `directors`;
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;

-- Copiando estrutura para tabela moviereferences.genres
CREATE TABLE IF NOT EXISTS `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela moviereferences.genres: ~3 rows (aproximadamente)
DELETE FROM `genres`;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` (`id`, `name`) VALUES
	(1, 'Action'),
	(2, 'Adventure'),
	(3, 'Animation'),
	(4, 'Biography'),
	(5, 'Comedy'),
	(6, 'Drama'),
	(7, 'Family'),
	(8, 'Fantasy'),
	(9, 'History'),
	(10, 'Horror'),
	(11, 'Music'),
	(12, 'Musical'),
	(13, 'Mystery'),
	(14, 'Romance'),
	(15, 'Sci-Fi'),
	(16, 'Thriller'),
	(17, 'War'),
	(18, 'Western');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;

-- Copiando estrutura para tabela moviereferences.movies
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext DEFAULT NULL,
  `studio_id` int(11) DEFAULT NULL,
  `director_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__studios` (`studio_id`),
  KEY `FK__directors` (`director_id`),
  CONSTRAINT `FK__directors` FOREIGN KEY (`director_id`) REFERENCES `directors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK__studios` FOREIGN KEY (`studio_id`) REFERENCES `studios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela moviereferences.movies: ~3 rows (aproximadamente)
DELETE FROM `movies`;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;

-- Copiando estrutura para tabela moviereferences.movies_actors
CREATE TABLE IF NOT EXISTS `movies_actors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__movies2` (`movie_id`),
  KEY `FK__actors` (`actor_id`),
  CONSTRAINT `FK__actors` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__movies2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela moviereferences.movies_actors: ~2 rows (aproximadamente)
DELETE FROM `movies_actors`;
/*!40000 ALTER TABLE `movies_actors` DISABLE KEYS */;
/*!40000 ALTER TABLE `movies_actors` ENABLE KEYS */;

-- Copiando estrutura para tabela moviereferences.movies_genres
CREATE TABLE IF NOT EXISTS `movies_genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__genres` (`genre_id`),
  KEY `FK__movies1` (`movie_id`),
  CONSTRAINT `FK__genres` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__movies1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela moviereferences.movies_genres: ~2 rows (aproximadamente)
DELETE FROM `movies_genres`;
/*!40000 ALTER TABLE `movies_genres` DISABLE KEYS */;
/*!40000 ALTER TABLE `movies_genres` ENABLE KEYS */;

-- Copiando estrutura para tabela moviereferences.studios
CREATE TABLE IF NOT EXISTS `studios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela moviereferences.studios: ~2 rows (aproximadamente)
DELETE FROM `studios`;
/*!40000 ALTER TABLE `studios` DISABLE KEYS */;
/*!40000 ALTER TABLE `studios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
