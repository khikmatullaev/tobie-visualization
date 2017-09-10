-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Сен 10 2017 г., 19:12
-- Версия сервера: 10.1.26-MariaDB
-- Версия PHP: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `js`
--

-- --------------------------------------------------------

--
-- Структура таблицы `skill`
--

CREATE TABLE `skill` (
  `id` int(11) NOT NULL,
  `statistics_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cluster` int(11) DEFAULT NULL,
  `occurrence` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `skill`
--

INSERT INTO `skill` (`id`, `statistics_id`, `name`, `cluster`, `occurrence`) VALUES
(1260, 53, 'Programming', 0, 1),
(1261, 53, 'Statistics', 0, 1),
(1262, 53, 'SQL', 1, 2),
(1263, 53, 'PerformanceTesting', 0, 1),
(1264, 53, 'DataAnalysis', 0, 1),
(1265, 53, 'Visio', 0, 1),
(1266, 53, 'Security', 0, 1),
(1267, 53, 'C++', 0, 1),
(1268, 53, 'Analyst', 2, 5),
(1269, 53, 'Administrator', 0, 1),
(1270, 53, 'ProjectManagement', 1, 2),
(1271, 53, 'Analytic', 0, 2),
(1272, 53, 'Excel', 1, 3),
(1273, 53, 'Reporting', 2, 3),
(1274, 53, 'Development', 0, 2),
(1275, 53, 'GO', 0, 1),
(1276, 53, 'MsOffice', 0, 1),
(1277, 53, 'VBA', 0, 1),
(1278, 53, 'Modeling', 0, 1),
(1279, 53, 'Design', 1, 2),
(1280, 53, 'Database', 2, 2),
(1281, 53, 'Finance', 0, 2),
(1282, 53, 'Analysis', 2, 5),
(1283, 53, 'Developer', 0, 1),
(1284, 53, 'Python', 0, 1),
(1285, 53, 'SAS', 0, 1),
(1286, 53, 'RiskManagement', 0, 1),
(1287, 53, 'Monitoring', 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `skill_connection`
--

CREATE TABLE `skill_connection` (
  `id` int(11) NOT NULL,
  `statistics_id` int(11) DEFAULT NULL,
  `skill1_id` int(11) DEFAULT NULL,
  `skill2_id` int(11) DEFAULT NULL,
  `strength` double NOT NULL,
  `co_occurrence` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `skill_connection`
--

INSERT INTO `skill_connection` (`id`, `statistics_id`, `skill1_id`, `skill2_id`, `strength`, `co_occurrence`) VALUES
(1789, 53, 1262, 1270, 0.00462963, 2),
(1790, 53, 1272, 1270, 0.011111111, 2),
(1791, 53, 1268, 1273, 0.000136, 3),
(1792, 53, 1282, 1280, 0.000581, 2),
(1793, 53, 1279, 1270, 0.005208333, 2),
(1794, 53, 1272, 1282, 0.001132075, 3),
(1795, 53, 1268, 1280, 0.000314, 2),
(1796, 53, 1282, 1270, 0.001257862, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `statistics`
--

CREATE TABLE `statistics` (
  `id` int(11) NOT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date NOT NULL,
  `occurrence` double(10,2) NOT NULL,
  `pass1link` int(11) NOT NULL,
  `pass2link` int(11) NOT NULL,
  `country` varchar(64) NOT NULL,
  `enabled` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `statistics`
--

INSERT INTO `statistics` (`id`, `from_date`, `to_date`, `occurrence`, `pass1link`, `pass2link`, `country`, `enabled`) VALUES
(53, '2017-09-01', '2017-11-01', 2.00, 2, 2, 'Uk', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `statistics_id` (`statistics_id`);

--
-- Индексы таблицы `skill_connection`
--
ALTER TABLE `skill_connection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill1_id` (`skill1_id`),
  ADD KEY `skill2_id` (`skill2_id`),
  ADD KEY `statistics_id` (`statistics_id`);

--
-- Индексы таблицы `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1288;
--
-- AUTO_INCREMENT для таблицы `skill_connection`
--
ALTER TABLE `skill_connection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1797;
--
-- AUTO_INCREMENT для таблицы `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`statistics_id`) REFERENCES `statistics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `skill_connection`
--
ALTER TABLE `skill_connection`
  ADD CONSTRAINT `skill_connection_ibfk_1` FOREIGN KEY (`skill1_id`) REFERENCES `skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_connection_ibfk_2` FOREIGN KEY (`skill2_id`) REFERENCES `skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_connection_ibfk_3` FOREIGN KEY (`statistics_id`) REFERENCES `statistics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
