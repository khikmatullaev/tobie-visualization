-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Сен 10 2017 г., 22:39
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
  `cluster` int(11) DEFAULT '0',
  `occurrence` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `skill`
--

INSERT INTO `skill` (`id`, `statistics_id`, `name`, `cluster`, `occurrence`) VALUES
(1288, 54, 'Programming', 0, 1),
(1289, 54, 'Statistics', 0, 1),
(1290, 54, 'SQL', 1, 2),
(1291, 54, 'PerformanceTesting', 0, 1),
(1292, 54, 'DataAnalysis', 0, 1),
(1293, 54, 'Visio', 0, 1),
(1294, 54, 'Security', 0, 1),
(1295, 54, 'C++', 0, 1),
(1296, 54, 'Analyst', 2, 5),
(1297, 54, 'Administrator', 0, 1),
(1298, 54, 'ProjectManagement', 1, 2),
(1299, 54, 'Analytic', 0, 2),
(1300, 54, 'Excel', 1, 3),
(1301, 54, 'Reporting', 2, 3),
(1302, 54, 'Development', 0, 2),
(1303, 54, 'GO', 0, 1),
(1304, 54, 'MsOffice', 0, 1),
(1305, 54, 'VBA', 0, 1),
(1306, 54, 'Modeling', 0, 1),
(1307, 54, 'Design', 1, 2),
(1308, 54, 'Database', 2, 2),
(1309, 54, 'Finance', 0, 2),
(1310, 54, 'Analysis', 2, 5),
(1311, 54, 'Developer', 0, 1),
(1312, 54, 'Python', 0, 1),
(1313, 54, 'SAS', 0, 1),
(1314, 54, 'RiskManagement', 0, 1),
(1315, 54, 'Monitoring', 0, 1);

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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1316;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`statistics_id`) REFERENCES `statistics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
