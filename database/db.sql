-- -- phpMyAdmin SQL Dump
-- -- version 4.9.1
-- -- https://www.phpmyadmin.net/
-- --
-- -- Servidor: 127.0.0.1
-- -- Tiempo de generación: 13-01-2021 a las 14:29:42
-- -- Versión del servidor: 10.4.8-MariaDB
-- -- Versión de PHP: 7.3.11

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET AUTOCOMMIT = 0;
-- START TRANSACTION;
-- SET time_zone = "+00:00";


-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8mb4 */;

-- --
-- -- Base de datos: `db_users`
-- --

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `links`
-- --

-- CREATE TABLE `links` (
--   `id` int(11) NOT NULL,
--   `title` varchar(150) NOT NULL,
--   `url` varchar(255) NOT NULL,
--   `description` text DEFAULT NULL,
--   `user_id` int(11) DEFAULT NULL,
--   `created_at` timestamp NOT NULL DEFAULT current_timestamp()
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --
-- -- Volcado de datos para la tabla `links`
-- --

-- INSERT INTO `links` (`id`, `title`, `url`, `description`, `user_id`, `created_at`) VALUES
-- (6, 'Web cualquiera', 'https://web.com', 'Desarrollo web', NULL, '2021-01-06 18:29:14'),
-- (10, 'against', 'https://facebook.com', 'again two', NULL, '2021-01-06 20:14:52'),
-- (11, 'edison', 'https://edison-munera.herokuapp.com/', 'hoja de vida', NULL, '2021-01-06 20:18:37'),
-- (12, 'Soy un título', 'https://twitter.com', 'Hola, soy una description', NULL, '2021-01-06 20:21:12');

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `sessions`
-- --

-- CREATE TABLE `sessions` (
--   `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
--   `expires` int(11) UNSIGNED NOT NULL,
--   `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --
-- -- Volcado de datos para la tabla `sessions`
-- --

-- INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
-- ('G0hb7Xq9Vh-Qd4_nt2_4mqVOV1KJB0_B', 1610582764, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),
-- ('G5DRTmhPz1UlaDb8_VrfLIK8PWO4Nb1W', 1610581730, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}');

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `users`
-- --

-- CREATE TABLE `users` (
--   `id` int(11) NOT NULL,
--   `username` varchar(16) NOT NULL,
--   `password` varchar(60) NOT NULL,
--   `fullname` varchar(100) NOT NULL,
--   `phone` int(20) NOT NULL,
--   `email` varchar(60) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --
-- -- Volcado de datos para la tabla `users`
-- --

-- INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `phone`, `email`) VALUES
-- (1, 'edisonupb2013@gm', '$2a$10$JLrNbuoAI0TDfLdmlsgw.uMnNMN/oBKIX.AV9qPFHxvSyCgch7SM2', 'Edison Múnera', 2147483647, 'edisonupb2013@gmail.com'),
-- (2, 'carlitos', '$2a$10$S4Z9iwuX0dy06QGAl72swOFvt7DdoxbmyWfnH0rgo9GSBixkWAEUm', 'Juan Carlos', 0, ''),
-- (3, 'carlitos', '$2a$10$K8Cb/49C.DC5EbRn1qdlU.9MJZqevDwE7lT82brTDvRzlUsAIWJq2', 'Juan Carlos', 315667788, 'carlos@admin.com'),
-- (4, 'carlitos', '$2a$10$drr4KFqcf0yRAdSL7vt1KetKS7DA1uo0sdd/T3QMlxA0CRyTLARWW', 'Juan Carlos', 315667788, 'carlos@admin.com'),
-- (5, 'carlitos', '$2a$10$0rwzbBKZG8KmgzsrHgvpIuQfEG8V.XW6vq62syKWLWT3x8rW8dBvS', 'Juan Carlos', 315667788, 'carlos@admin.com'),
-- (6, 'edi', '$2a$10$3jiOCsAIINN7ft1ialOIRunbpSaV0juAOpMRMlTKW22Ac31DYDeQK', 'Edison', 2147483647, 'edisonupb2013@gmail.com');

-- --
-- -- Índices para tablas volcadas
-- --

-- --
-- -- Indices de la tabla `links`
-- --
-- ALTER TABLE `links`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `fk_user` (`user_id`);

-- --
-- -- Indices de la tabla `sessions`
-- --
-- ALTER TABLE `sessions`
--   ADD PRIMARY KEY (`session_id`);

-- --
-- -- Indices de la tabla `users`
-- --
-- ALTER TABLE `users`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- AUTO_INCREMENT de las tablas volcadas
-- --

-- --
-- -- AUTO_INCREMENT de la tabla `links`
-- --
-- ALTER TABLE `links`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

-- --
-- -- AUTO_INCREMENT de la tabla `users`
-- --
-- ALTER TABLE `users`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

-- --
-- -- Restricciones para tablas volcadas
-- --

-- --
-- -- Filtros para la tabla `links`
-- --
-- ALTER TABLE `links`
--   ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
