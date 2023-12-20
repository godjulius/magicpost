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
    `order_id` VARCHAR(255) NOT NULL,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `receiver_id` BIGINT UNSIGNED NOT NULL,
    `send_date` DATETIME NOT NULL,
    `receive_date` DATETIME NOT NULL
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
    `parcel_id` BIGINT UNSIGNED NOT NULL,
    `employee_id` BIGINT UNSIGNED NOT NULL,
    `status_id` TINYINT UNSIGNED NOT NULL,
    `order_date` DATETIME NOT NULL,
    `receiver_name` VARCHAR(255) NOT NULL,
    `receiver_phone` VARCHAR(255) NOT NULL,
    `receiver_address` VARCHAR(255) NOT NULL
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
    `Delivery` ADD CONSTRAINT `delivery_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `Order`(`order_id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_status_id_foreign` FOREIGN KEY(`status_id`) REFERENCES `Status`(`status_id`);
ALTER TABLE
    `Delivery` ADD CONSTRAINT `delivery_sender_id_foreign` FOREIGN KEY(`sender_id`) REFERENCES `Branch`(`branch_id`);
ALTER TABLE
    `Branch` ADD CONSTRAINT `branch_manager_id_foreign` FOREIGN KEY(`manager_id`) REFERENCES `Employee`(`employee_id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_parcel_id_foreign` FOREIGN KEY(`parcel_id`) REFERENCES `Parcel`(`parcel_id`);
ALTER TABLE
    `Parcel` ADD CONSTRAINT `parcel_branch_id_foreign` FOREIGN KEY(`branch_id`) REFERENCES `Branch`(`branch_id`);

INSERT INTO `parceltype` (`type_id`, `type_name`) VALUES
(1, 'Tài liệu'),
(2, 'Bưu phẩm');

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'Giám đốc'),
(3, 'Trưởng điểm tập kết'),
(4, 'Trưởng điểm giao dịch'),
(5, 'Nhân viên điểm giao dịch');

INSERT INTO `status` (`status_id`, `status_detail`) VALUES
(1, 'pending'),
(2, 'delivering'),
(3, 'delivered'),
(4, 'return');

INSERT INTO `parceltype` (`type_id`, `type_name`) VALUES
(1, 'Tài liệu'),
(2, 'Bưu phẩm'),
