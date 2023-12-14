DROP SCHEMA IF EXISTS magicpost;
CREATE SCHEMA magicpost;
USE magicpost;

CREATE TABLE `ParcelType`(
    `type_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type_name` VARCHAR(255) NOT NULL
);
CREATE TABLE `Employee`(
    `employee_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,
    `branch_id` BIGINT UNSIGNED NULL,
    `dob` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` BIGINT NOT NULL
);
ALTER TABLE
    `Employee` ADD UNIQUE `employee_email_unique`(`email`);
ALTER TABLE
    `Employee` ADD UNIQUE `employee_phone_unique`(`phone`);
CREATE TABLE `Role`(
    `role_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role_name` VARCHAR(255) NOT NULL
);
CREATE TABLE `Parcel`(
    `parcel_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `branch_id` BIGINT UNSIGNED NOT NULL,
    `weight` DOUBLE NOT NULL,
    `price` INT NOT NULL,
    `details` VARCHAR(255) NOT NULL,
    `type_id` TINYINT UNSIGNED NOT NULL
);
CREATE TABLE `Branch`(
    `manager_id` BIGINT UNSIGNED NOT NULL,
    `hub_id` BIGINT UNSIGNED NULL,
    `branch_name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `branch_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `is_hub` TINYINT(1) NOT NULL DEFAULT '0'
);
CREATE TABLE `Delivery`(
    `delivery_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NULL,
    `receiver_id` BIGINT UNSIGNED NULL,
    `send_date` DATETIME NULL,
    `receive_date` DATETIME NULL,
    `status_id` TINYINT UNSIGNED NOT NULL,
    `receiver_name` VARCHAR(255) NOT NULL,
    `receiver_phone` VARCHAR(255) NOT NULL,
    `receiver_address` BIGINT NOT NULL
);
CREATE TABLE `Status`(
    `status_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `status_detail` VARCHAR(255) NOT NULL
);
CREATE TABLE `Customer`(
    `customer_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NOT NULL
);
CREATE TABLE `Order`(
    `order_id` VARCHAR(255) NOT NULL,
    `customer_id` BIGINT UNSIGNED NOT NULL,
    `delivery_id` BIGINT UNSIGNED NOT NULL,
    `parcel_id` BIGINT UNSIGNED NOT NULL,
    `employee_id` BIGINT UNSIGNED NOT NULL,
    `order_date` DATETIME NOT NULL
);
ALTER TABLE
    `Order` ADD PRIMARY KEY(`order_id`);
ALTER TABLE
    `Employee` ADD CONSTRAINT `employee_branch_id_foreign` FOREIGN KEY(`branch_id`) REFERENCES `Branch`(`branch_id`);
ALTER TABLE
    `Branch` ADD CONSTRAINT `branch_hub_id_foreign` FOREIGN KEY(`hub_id`) REFERENCES `Branch`(`branch_id`);
ALTER TABLE
    `Parcel` ADD CONSTRAINT `parcel_type_id_foreign` FOREIGN KEY(`type_id`) REFERENCES `ParcelType`(`type_id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_employee_id_foreign` FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`);
ALTER TABLE
    `Delivery` ADD CONSTRAINT `delivery_receiver_id_foreign` FOREIGN KEY(`receiver_id`) REFERENCES `Branch`(`branch_id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `Customer`(`customer_id`);
ALTER TABLE
    `Employee` ADD CONSTRAINT `employee_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `Role`(`role_id`);
ALTER TABLE
    `Delivery` ADD CONSTRAINT `delivery_status_id_foreign` FOREIGN KEY(`status_id`) REFERENCES `Status`(`status_id`);
ALTER TABLE
    `Delivery` ADD CONSTRAINT `delivery_sender_id_foreign` FOREIGN KEY(`sender_id`) REFERENCES `Branch`(`branch_id`);
ALTER TABLE
    `Branch` ADD CONSTRAINT `branch_manager_id_foreign` FOREIGN KEY(`manager_id`) REFERENCES `Employee`(`employee_id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_parcel_id_foreign` FOREIGN KEY(`parcel_id`) REFERENCES `Parcel`(`parcel_id`);
ALTER TABLE
    `Parcel` ADD CONSTRAINT `parcel_branch_id_foreign` FOREIGN KEY(`branch_id`) REFERENCES `Branch`(`branch_id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_delivery_id_foreign` FOREIGN KEY(`delivery_id`) REFERENCES `Delivery`(`delivery_id`);

INSERT INTO `branch` (`manager_id`, `hub_id`, `branch_name`, `location`, `branch_id`, `is_hub`) VALUES
(1, NULL, 'Cầu Giấy Hub', 'Quan Hoa, Cầu Giấy, Hà Nội', 4, 0),
(1, NULL, 'Cầu Giấy Hub', '52 Quan Hoa, Cầu Giấy, Hà Nội', 5, 1),
(1, NULL, 'Quan Hoa branch', '52 Quan Hoa, Cầu Giấy, Hà Nội', 6, 1),
(1, NULL, 'Quan Hoa branch', '52 Quan Hoa, Cầu Giấy, Hà Nội', 7, 1),
(1, NULL, 'Quan Hoa branch', '165 Cầu Giấy, Cầu Giấy, Hà Nội', 8, 1),
(1, NULL, 'Quan Hoa branch', '165 Nam Từ Liêm, Cầu Giấy, Hà Nội', 9, 1),
(1, NULL, 'Quan Hoa branch', '165 BắcTừ Liêm, Cầu Giấy, Hà Nội', 10, 1),
(1, NULL, 'Quan Hoa branch', '165 BắcTừ Liêm, Cầu Giấy, Hà Nội', 11, 1);

INSERT INTO `customer` (`customer_id`, `first_name`, `last_name`, `address`, `email`, `phone`) VALUES
(1, 'Hải', 'Trần', 'Quan Hoa, Cầu Giấy, Hà Nội', NULL, '23423'),
(2, 'Hải', 'Trần', 'Quan Hoa, Cầu Giấy, Hà Nội', NULL, '23423'),
(3, 'Hải', 'Trần', 'Quan Hoa, Cầu Giấy, Hà Nội', NULL, '23423'),
(4, 'Hải', 'Trần', 'Quan Hoa, Cầu Giấy, Hà Nội', NULL, '23423'),
(5, 'Hải', 'Trần', 'Quan Hoa, Cầu Giấy, Hà Nội', NULL, '23423'),
(6, 'Hải', 'Trần', 'Quan Hoa, Cầu Giấy, Hà Nội', NULL, '23423'),
(7, 'Hải', 'Trần', 'Quan Hoa, Cầu Giấy, Hà Nội', NULL, '23423'),
(8, 'Duy', 'Nguyễn', 'Ngọc Sơn, Hiệp Hoà, Bắc Giang', NULL, '23423');

INSERT INTO `delivery` (`delivery_id`, `sender_id`, `receiver_id`, `send_date`, `receive_date`, `status_id`) VALUES
(2, NULL, 4, NULL, '2023-11-26 11:41:01', 1),
(3, NULL, 4, NULL, '2023-11-26 11:42:10', 1);

INSERT INTO `employee` (`employee_id`, `password`, `first_name`, `last_name`, `email`, `role_id`, `branch_id`, `dob`, `address`, `phone`) VALUES
(1, '$2b$10$H0GXTnc.DX3.4gAC.WLO9.Yg0Gf315Ai.53ZyhUK/SMKO3J4hlaoy', 'Duy', 'Nguyễn', 'duy@gmail.com', 1, NULL, '2003-04-20', 'Bắc Giang', '0345643253'),
(2, '$2b$10$UnqQUqGbXolcTr7wfoCdmuY61RMSOtBRcyqgI9OAPWczo4M.KR25O', 'Duy', 'Nguyễn', 'duy2003@gmail.com', 1, NULL, '2003-04-20', 'Bắc Giang', '0345943253');

INSERT INTO `order` (`order_id`, `customer_id`, `delivery_id`, `parcel_id`, `employee_id`, `order_date`) VALUES
('FOGZ5KG2O8', 8, 3, 5, 2, '2023-11-26 11:42:10'),
('SZICB8EAK9', 7, 2, 4, 2, '2023-11-26 11:41:01');

INSERT INTO `parcel` (`parcel_id`, `branch_id`, `weight`, `price`, `details`, `type_id`) VALUES
(3, 4, 55, 334000, 'something...', 1),
(4, 4, 55, 334000, 'something...', 1),
(5, 4, 55, 334000, 'something...', 1);

INSERT INTO `parceltype` (`type_id`, `type_name`) VALUES
(1, 'Tài liệu'),
(2, 'Bưu phẩm');

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'Giám đốc'),
(3, 'Trưởng điểm tập kết'),
(4, 'Nhân viên điểm tập kết'),
(5, 'Trưởng điểm giao dịch'),
(6, 'Nhân viên điểm giao dịch');

INSERT INTO `status` (`status_id`, `status_detail`) VALUES
(1, 'pending'),
(2, 'delivering'),
(3, 'delivered'),
(4, 'return');

INSERT INTO `parceltype` (`type_id`, `type_name`) VALUES
(1, 'Tài liệu'),
(2, 'Bưu phẩm'),


