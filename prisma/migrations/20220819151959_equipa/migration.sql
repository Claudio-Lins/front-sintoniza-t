-- CreateTable
CREATE TABLE `equipas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `telemovel` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `datePublished` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fileUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
