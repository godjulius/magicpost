DROP SCHEMA IF EXISTS magicpost;
CREATE SCHEMA magicpost;
USE magicpost;

CREATE TABLE `Users`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `second_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,
    `branch_id` BIGINT UNSIGNED NULL,
    `dob` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL
);
CREATE TABLE `Roles`(
    `role_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role_name` VARCHAR(255) NOT NULL
);
CREATE TABLE `Payments`(
    `payment_id` VARCHAR(255) NOT NULL,
    `employee_id` BIGINT UNSIGNED NOT NULL,
    `source_branch_id` BIGINT UNSIGNED NOT NULL,
    `des_branch_id` BIGINT UNSIGNED NOT NULL,
    `details` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `status` TINYINT(1) NOT NULL
);
ALTER TABLE
    `Payments` ADD PRIMARY KEY(`payment_id`);
CREATE TABLE `Branches`(
    `branch_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `branch_name` VARCHAR(255) NOT NULL,
    `manager_id` BIGINT UNSIGNED NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `warehouse_id` BIGINT UNSIGNED NULL,
    `branch_type` SMALLINT NOT NULL
);
CREATE TABLE `Transportations`(
    `trans_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `receiver_id` BIGINT UNSIGNED NOT NULL,
    `send_date` DATETIME NOT NULL,
    `receive_date` DATETIME NOT NULL,
    `status` TINYINT(1) NOT NULL,
    `payment_id` VARCHAR(255) NOT NULL
);
CREATE TABLE `payment_warehouse`(
    `payment_id` VARCHAR(255) NOT NULL,
    `branch_id` BIGINT UNSIGNED NOT NULL,
	primary key (payment_id, branch_id),
	constraint `payment_warehouse_payment_fk` foreign key(`payment_id`) references `payments` (`payment_id`) on delete cascade on update cascade,
	constraint `payment_warehouse_branch_fk` foreign key(`branch_id`) references `branches` (`branch_id`) on delete cascade on update cascade
);
ALTER TABLE
    `Branches` ADD CONSTRAINT `branches_warehouse_id_foreign` FOREIGN KEY(`warehouse_id`) REFERENCES `Branches`(`branch_id`) on delete cascade on update cascade;
ALTER TABLE
    `Payments` ADD CONSTRAINT `payments_employee_id_foreign` FOREIGN KEY(`employee_id`) REFERENCES `Users`(`user_id`) on delete cascade on update cascade;
ALTER TABLE
    `Branches` ADD CONSTRAINT `branches_manager_id_foreign` FOREIGN KEY(`manager_id`) REFERENCES `Users`(`user_id`) on delete cascade on update cascade;
ALTER TABLE
    `Transportations` ADD CONSTRAINT `transportations_receiver_id_foreign` FOREIGN KEY(`receiver_id`) REFERENCES `Branches`(`branch_id`) on delete cascade on update cascade;
ALTER TABLE
    `Payments` ADD CONSTRAINT `payments_des_branch_id_foreign` FOREIGN KEY(`des_branch_id`) REFERENCES `Branches`(`branch_id`) on delete cascade on update cascade;
ALTER TABLE
    `Transportations` ADD CONSTRAINT `transportations_sender_id_foreign` FOREIGN KEY(`sender_id`) REFERENCES `Branches`(`branch_id`) on delete cascade on update cascade;
ALTER TABLE
    `Branches` ADD CONSTRAINT `branches_branch_id_foreign` FOREIGN KEY(`branch_id`) REFERENCES `payment_warehouse`(`branch_id`) on delete cascade on update cascade;
ALTER TABLE
    `Users` ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `Roles`(`role_id`) on delete cascade on update cascade;
ALTER TABLE
    `Payments` ADD CONSTRAINT `payments_source_branch_id_foreign` FOREIGN KEY(`source_branch_id`) REFERENCES `Branches`(`branch_id`) on delete cascade on update cascade;
ALTER TABLE
    `Payments` ADD CONSTRAINT `payments_payment_id_foreign` FOREIGN KEY(`payment_id`) REFERENCES `payment_warehouse`(`payment_id`) on delete cascade on update cascade;
ALTER TABLE
    `Users` ADD CONSTRAINT `users_branch_id_foreign` FOREIGN KEY(`branch_id`) REFERENCES `Branches`(`branch_id`) on delete cascade on update cascade;
ALTER TABLE
    `Transportations` ADD CONSTRAINT `transportations_payment_id_foreign` FOREIGN KEY(`payment_id`) REFERENCES `Payments`(`payment_id`) on delete cascade on update cascade;