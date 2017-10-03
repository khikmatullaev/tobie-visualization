-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-09-16 10:32:05
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `js`
--

-- --------------------------------------------------------

--
-- 表的结构 `skill`
--

CREATE TABLE `skill` (
  `id` int(11) NOT NULL,
  `statistics_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cluster` int(11) DEFAULT '0',
  `occurrence` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `skill`
--

INSERT INTO `skill` (`id`, `statistics_id`, `name`, `cluster`, `occurrence`) VALUES
(1316, 55, 'Programming', 0, 1),
(1317, 55, 'Statistics', 0, 1),
(1318, 55, 'SQL', 1, 2),
(1319, 55, 'PerformanceTesting', 0, 1),
(1320, 55, 'DataAnalysis', 0, 1),
(1321, 55, 'Visio', 0, 1),
(1322, 55, 'Security', 0, 1),
(1323, 55, 'C++', 0, 1),
(1324, 55, 'Analyst', 2, 5),
(1325, 55, 'Administrator', 0, 1),
(1326, 55, 'ProjectManagement', 1, 2),
(1327, 55, 'Analytic', 0, 2),
(1328, 55, 'Excel', 1, 3),
(1329, 55, 'Reporting', 2, 3),
(1330, 55, 'Development', 0, 2),
(1331, 55, 'GO', 0, 1),
(1332, 55, 'MsOffice', 0, 1),
(1333, 55, 'VBA', 0, 1),
(1334, 55, 'Modeling', 0, 1),
(1335, 55, 'Design', 1, 2),
(1336, 55, 'Database', 2, 2),
(1337, 55, 'Finance', 0, 2),
(1338, 55, 'Analysis', 2, 5),
(1339, 55, 'Developer', 0, 1),
(1340, 55, 'Python', 0, 1),
(1341, 55, 'SAS', 0, 1),
(1342, 55, 'RiskManagement', 0, 1),
(1343, 55, 'Monitoring', 0, 1),
(1344, 56, 'Programming', 0, 11),
(1345, 56, 'Statistics', 4, 8),
(1346, 56, 'SQL', 1, 12),
(1347, 56, 'PerformanceTesting', 3, 11),
(1348, 56, 'DataAnalysis', 3, 17),
(1349, 56, 'Visio', 3, 11),
(1350, 56, 'Security', 4, 20),
(1351, 56, 'C++', 4, 10),
(1352, 56, 'Analyst', 2, 15),
(1353, 56, 'Administrator', 5, 11),
(1354, 56, 'ProjectManagement', 1, 22),
(1355, 56, 'Analytic', 0, 12),
(1356, 56, 'Excel', 1, 13),
(1357, 56, 'Reporting', 2, 19),
(1358, 56, 'Development', 3, 12),
(1359, 56, 'GO', 5, 11),
(1360, 56, 'MsOffice', 5, 22),
(1361, 56, 'VBA', 0, 9),
(1362, 56, 'Modeling', 4, 11),
(1363, 56, 'Design', 1, 10),
(1364, 56, 'Database', 2, 22),
(1365, 56, 'Finance', 0, 12),
(1366, 56, 'Analysis', 2, 8),
(1367, 56, 'Developer', 3, 6),
(1368, 56, 'Python', 4, 11),
(1369, 56, 'SAS', 0, 15),
(1370, 56, 'RiskManagement', 0, 11),
(1371, 56, 'Monitoring', 0, 10),
(1400, 58, 'Programming', 0, 1),
(1401, 58, 'Statistics', 4, 1),
(1402, 58, 'SQL', 1, 2),
(1403, 58, 'PerformanceTesting', 3, 1),
(1404, 58, 'DataAnalysis', 3, 1),
(1405, 58, 'Visio', 3, 1),
(1406, 58, 'Security', 4, 1),
(1407, 58, 'C++', 4, 1),
(1408, 58, 'Analyst', 2, 5),
(1409, 58, 'Administrator', 5, 1),
(1410, 58, 'ProjectManagement', 1, 2),
(1411, 58, 'Analytic', 0, 2),
(1412, 58, 'Excel', 1, 3),
(1413, 58, 'Reporting', 2, 3),
(1414, 58, 'Development', 3, 2),
(1415, 58, 'GO', 5, 1),
(1416, 58, 'MsOffice', 5, 1),
(1417, 58, 'VBA', 0, 1),
(1418, 58, 'Modeling', 4, 1),
(1419, 58, 'Design', 1, 2),
(1420, 58, 'Database', 2, 2),
(1421, 58, 'Finance', 0, 2),
(1422, 58, 'Analysis', 2, 5),
(1423, 58, 'Developer', 3, 1),
(1424, 58, 'Python', 4, 1),
(1425, 58, 'SAS', 0, 1),
(1426, 58, 'RiskManagement', 0, 1),
(1427, 58, 'Monitoring', 0, 1),
(1428, 59, 'Programming', 0, 11),
(1429, 59, 'Statistics', 0, 8),
(1430, 59, 'SQL', 1, 12),
(1431, 59, 'PerformanceTesting', 0, 11),
(1432, 59, 'DataAnalysis', 0, 17),
(1433, 59, 'Visio', 0, 11),
(1434, 59, 'Security', 0, 20),
(1435, 59, 'C++', 0, 10),
(1436, 59, 'Analyst', 2, 15),
(1437, 59, 'Administrator', 0, 11),
(1438, 59, 'ProjectManagement', 1, 22),
(1439, 59, 'Analytic', 0, 12),
(1440, 59, 'Excel', 1, 13),
(1441, 59, 'Reporting', 2, 19),
(1442, 59, 'Development', 0, 12),
(1443, 59, 'GO', 0, 11),
(1444, 59, 'MsOffice', 0, 22),
(1445, 59, 'VBA', 0, 9),
(1446, 59, 'Modeling', 0, 11),
(1447, 59, 'Design', 1, 10),
(1448, 59, 'Database', 2, 22),
(1449, 59, 'Finance', 0, 12),
(1450, 59, 'Analysis', 2, 8),
(1451, 59, 'Developer', 0, 6),
(1452, 59, 'Python', 0, 11),
(1453, 59, 'SAS', 0, 15),
(1454, 59, 'RiskManagement', 0, 11),
(1455, 59, 'Monitoring', 0, 10);

-- --------------------------------------------------------

--
-- 表的结构 `skill_connection`
--

CREATE TABLE `skill_connection` (
  `id` int(11) NOT NULL,
  `statistics_id` int(11) DEFAULT NULL,
  `skill1_id` int(11) DEFAULT NULL,
  `skill2_id` int(11) DEFAULT NULL,
  `strength` double NOT NULL,
  `co_occurrence` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `skill_connection`
--

INSERT INTO `skill_connection` (`id`, `statistics_id`, `skill1_id`, `skill2_id`, `strength`, `co_occurrence`) VALUES
(1805, 55, 1318, 1326, 0.00462963, 2),
(1806, 55, 1328, 1326, 0.011111111, 2),
(1807, 55, 1324, 1329, 0.000136, 3),
(1808, 55, 1338, 1336, 0.000581, 2),
(1809, 55, 1335, 1326, 0.005208333, 2),
(1810, 55, 1328, 1338, 0.001132075, 3),
(1811, 55, 1324, 1336, 0.000314, 2),
(1812, 55, 1338, 1326, 0.001257862, 2),
(1813, 56, 1348, 1349, 0.333333343, 1),
(1814, 56, 1359, 1360, 0.027777778, 1),
(1815, 56, 1356, 1360, 0.005555556, 1),
(1816, 56, 1346, 1354, 0.00462963, 2),
(1817, 56, 1363, 1348, 0.005208333, 1),
(1818, 56, 1367, 1347, 0.055555556, 1),
(1819, 56, 1356, 1354, 0.011111111, 2),
(1820, 56, 1345, 1368, 0.027777778, 1),
(1821, 56, 1358, 1367, 0.000496, 1),
(1822, 56, 1352, 1345, 0.00068, 1),
(1823, 56, 1360, 1353, 0.016666668, 1),
(1824, 56, 1352, 1367, 0.000113, 1),
(1825, 56, 1359, 1353, 0.016666668, 1),
(1826, 56, 1352, 1357, 0.000136, 3),
(1827, 56, 1366, 1364, 0.000581, 2),
(1828, 56, 1345, 1350, 0.055555556, 1),
(1829, 56, 1364, 1353, 0.003846154, 1),
(1830, 56, 1350, 1362, 0.016666668, 1),
(1831, 56, 1358, 1349, 0.008928572, 1),
(1832, 56, 1364, 1362, 0.003846154, 1),
(1833, 56, 1363, 1354, 0.005208333, 2),
(1834, 56, 1351, 1368, 0.020833334, 1),
(1835, 56, 1356, 1366, 0.001132075, 3),
(1836, 56, 1358, 1350, 0.001488095, 1),
(1837, 56, 1352, 1364, 0.000314, 2),
(1838, 56, 1366, 1354, 0.001257862, 2),
(1865, 58, 1404, 1405, 0.333333343, 1),
(1866, 58, 1415, 1416, 0.027777778, 1),
(1867, 58, 1412, 1416, 0.005555556, 1),
(1868, 58, 1402, 1410, 0.00462963, 2),
(1869, 58, 1419, 1404, 0.005208333, 1),
(1870, 58, 1423, 1403, 0.055555556, 1),
(1871, 58, 1412, 1410, 0.011111111, 2),
(1872, 58, 1401, 1424, 0.027777778, 1),
(1873, 58, 1414, 1423, 0.000496, 1),
(1874, 58, 1408, 1401, 0.00068, 1),
(1875, 58, 1416, 1409, 0.016666668, 1),
(1876, 58, 1408, 1423, 0.000113, 1),
(1877, 58, 1415, 1409, 0.016666668, 1),
(1878, 58, 1408, 1413, 0.000136, 3),
(1879, 58, 1422, 1420, 0.000581, 2),
(1880, 58, 1401, 1406, 0.055555556, 1),
(1881, 58, 1420, 1409, 0.003846154, 1),
(1882, 58, 1406, 1418, 0.016666668, 1),
(1883, 58, 1414, 1405, 0.008928572, 1),
(1884, 58, 1420, 1418, 0.003846154, 1),
(1885, 58, 1419, 1410, 0.005208333, 2),
(1886, 58, 1407, 1424, 0.020833334, 1),
(1887, 58, 1412, 1422, 0.001132075, 3),
(1888, 58, 1414, 1406, 0.001488095, 1),
(1889, 58, 1408, 1420, 0.000314, 2),
(1890, 58, 1422, 1410, 0.001257862, 2),
(1891, 59, 1430, 1438, 0.00462963, 2),
(1892, 59, 1440, 1438, 0.011111111, 2),
(1893, 59, 1436, 1441, 0.000136, 3),
(1894, 59, 1450, 1448, 0.000581, 2),
(1895, 59, 1447, 1438, 0.005208333, 2),
(1896, 59, 1440, 1450, 0.001132075, 3),
(1897, 59, 1436, 1448, 0.000314, 2),
(1898, 59, 1450, 1438, 0.001257862, 2);

-- --------------------------------------------------------

--
-- 表的结构 `statistics`
--

CREATE TABLE `statistics` (
  `id` int(11) NOT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date NOT NULL,
  `cooccurrence` int(11) NOT NULL DEFAULT '0',
  `pass1link` int(11) NOT NULL,
  `pass2link` int(11) NOT NULL,
  `country` varchar(64) NOT NULL,
  `enabled` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `statistics`
--

INSERT INTO `statistics` (`id`, `from_date`, `to_date`, `cooccurrence`, `pass1link`, `pass2link`, `country`, `enabled`) VALUES
(55, '2016-08-01', '2016-08-01', 1, 2, 2, 'Uk', 1),
(56, '2016-09-01', '2016-09-01', 1, 2, 2, 'Uk', 1),
(58, '2016-08-01', '2016-08-01', 2, 3, 3, 'Uk', 1),
(59, '2016-08-01', '2016-08-01', 1, 2, 2, 'DE', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `statistics_id` (`statistics_id`);

--
-- Indexes for table `skill_connection`
--
ALTER TABLE `skill_connection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill1_id` (`skill1_id`),
  ADD KEY `skill2_id` (`skill2_id`),
  ADD KEY `statistics_id` (`statistics_id`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1456;
--
-- 使用表AUTO_INCREMENT `skill_connection`
--
ALTER TABLE `skill_connection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1899;
--
-- 使用表AUTO_INCREMENT `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- 限制导出的表
--

--
-- 限制表 `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`statistics_id`) REFERENCES `statistics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `skill_connection`
--
ALTER TABLE `skill_connection`
  ADD CONSTRAINT `skill_connection_ibfk_1` FOREIGN KEY (`skill1_id`) REFERENCES `skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_connection_ibfk_2` FOREIGN KEY (`skill2_id`) REFERENCES `skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_connection_ibfk_3` FOREIGN KEY (`statistics_id`) REFERENCES `statistics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
