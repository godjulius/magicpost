DROP SCHEMA IF EXISTS magicpost;
CREATE SCHEMA magicpost;
USE magicpost;

CREATE TABLE `branch` (
  `manager_id` bigint UNSIGNED NOT NULL,
  `hub_id` bigint UNSIGNED DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `branch_id` bigint UNSIGNED NOT NULL,
  `is_hub` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `branch` (`manager_id`, `hub_id`, `branch_name`, `location`, `branch_id`, `is_hub`) VALUES
(35, 7, 'Hanoi LM Hub', 'Cầu giấy, Hà Nội', 7, 1),
(33, 7, 'Cầu giấy branch', 'Dịch Vọng', 8, 0),
(34, 7, 'Nghĩa Đô branch', 'Nghĩa Đô', 9, 0);

CREATE TABLE `customer` (
  `customer_id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `delivery` (
  `delivery_id` bigint UNSIGNED NOT NULL,
  `src_branch_id` bigint UNSIGNED NOT NULL,
  `des_branch_id` bigint UNSIGNED NOT NULL,
  `sender_id` bigint UNSIGNED DEFAULT NULL,
  `receiver_id` bigint UNSIGNED DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  `receive_date` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employee` (
  `employee_id` bigint UNSIGNED NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `branch_id` bigint UNSIGNED DEFAULT NULL,
  `dob` date NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `employee` (`employee_id`, `password`, `first_name`, `last_name`, `email`, `role_id`, `branch_id`, `dob`, `phone`, `address`) VALUES
(25, '$2b$10$Ogh038ANVdgLEG6nj41.s.hn0oZJ7MRPeENN0678lPCbsmUe1JjFu', 'Duy', 'Nguyen', 'duy@gmail.com', 1, NULL, '2003-12-12', '03678', 'Vietnam'),
(30, 'nguyenduy2003', 'duy', 'van', 'duy@duy.com', 4, NULL, '2001-05-26', '0987900123', 'Hà Giang'),
(31, 'nguyenduy2003', 'Kiên', 'Nam', 'kien@test.com', 4, NULL, '1990-08-05', '098901245', 'Bắc Kạn'),
(32, 'haduykien', 'Vân', 'Nam', 'user@test.com', 2, NULL, '2013-09-12', '00999134324', 'Trung Quốc'),
(33, 'nidalee', 'Gareth', 'Southgate', 'england@football.com', 2, NULL, '1993-09-12', '009812341', 'London'),
(34, 'haalandhaaland', 'Erling', 'Haaland', 'machine@football.com', 5, 9, '2001-12-20', '009812301', 'Manchester'),
(35, 'bald', 'Hag', 'Erik', 'mnsd@redbull.com', 3, NULL, '2009-04-20', '09900991213', 'Newcastle'),
(36, 'goat', 'Leo', 'Messi', 'goat@top1.com', 6, 9, '2000-04-01', '09877124245', 'Miami'),
(37, '$2b$10$TIAuUi7t1u1WFQCA1PpfFe6x5TaQxyhdHnzU0xl9DcK5foWfD/KnK', 'Duy', 'Nguyen', 'duy242@hh.com', 1, NULL, '2004-08-20', '03679298', 'Vietnam');

CREATE TABLE `order` (
  `order_id` bigint UNSIGNED NOT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `delivery_id` bigint UNSIGNED NOT NULL,
  `parcel_id` varchar(255) NOT NULL,
  `employee_id` bigint UNSIGNED NOT NULL,
  `order_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `parcel` (
  `parcel_id` varchar(255) NOT NULL,
  `branch_id` bigint UNSIGNED NOT NULL,
  `weight` double NOT NULL,
  `price` int NOT NULL,
  `type` tinyint(1) NOT NULL,
  `details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `role_id` bigint UNSIGNED NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'Giám đốc'),
(3, 'Trưởng điểm tập kết'),
(4, 'Nhân viên điểm tập kết'),
(5, 'Trưởng điểm giao dịch'),
(6, 'Nhân viên điểm giao dịch');


ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`),
  ADD KEY `branch_hub_id_foreign` (`hub_id`) USING BTREE,
  ADD KEY `branch_manager_id_foreign` (`manager_id`) USING BTREE;

ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

ALTER TABLE `delivery`
  ADD PRIMARY KEY (`delivery_id`),
  ADD KEY `delivery_receiver_id_foreign` (`receiver_id`) USING BTREE,
  ADD KEY `delivery_sender_id_foreign` (`sender_id`) USING BTREE,
  ADD KEY `delivery_src_branch_id_foreign` (`src_branch_id`),
  ADD KEY `delivery_des_branch_id_foreign` (`des_branch_id`);

ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_email_unique` (`email`),
  ADD UNIQUE KEY `employee_phone_unique` (`phone`),
  ADD KEY `employee_branch_id_foreign` (`branch_id`) USING BTREE,
  ADD KEY `employee_role_id_foreign` (`role_id`) USING BTREE;

ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `order_customer_id_foreign` (`customer_id`) USING BTREE,
  ADD KEY `order_parcel_id_foreign` (`parcel_id`) USING BTREE,
  ADD KEY `order_delivery_id_foreign` (`delivery_id`) USING BTREE,
  ADD KEY `order_employee_id_foreign` (`employee_id`) USING BTREE;

ALTER TABLE `parcel`
  ADD PRIMARY KEY (`parcel_id`),
  ADD KEY `parcel_branch_id_foreign` (`branch_id`) USING BTREE;

ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);


ALTER TABLE `branch`
  MODIFY `branch_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `customer`
  MODIFY `customer_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `delivery`
  MODIFY `delivery_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `employee`
  MODIFY `employee_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

ALTER TABLE `order`
  MODIFY `order_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `role`
  MODIFY `role_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


ALTER TABLE `branch`
  ADD CONSTRAINT `branch_ibfk_263` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `branch_ibfk_264` FOREIGN KEY (`hub_id`) REFERENCES `branch` (`branch_id`) ON UPDATE CASCADE;

ALTER TABLE `delivery`
  ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`src_branch_id`) REFERENCES `branch` (`branch_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`des_branch_id`) REFERENCES `branch` (`branch_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `delivery_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `branch` (`branch_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `delivery_ibfk_4` FOREIGN KEY (`receiver_id`) REFERENCES `branch` (`branch_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_269` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_ibfk_270` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_540` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_541` FOREIGN KEY (`delivery_id`) REFERENCES `delivery` (`delivery_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_542` FOREIGN KEY (`parcel_id`) REFERENCES `parcel` (`parcel_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_543` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE;

ALTER TABLE `parcel`
  ADD CONSTRAINT `parcel_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
