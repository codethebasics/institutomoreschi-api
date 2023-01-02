-- CreateTable
CREATE TABLE `secretarias` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `secretarias_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dentistas` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `dentistas_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedimento` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `procedimento_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dentistas_procedimentos` (
    `dentistId` VARCHAR(191) NOT NULL,
    `procedureId` VARCHAR(191) NOT NULL,
    `scheduled_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `scheduled_for` DATETIME(3) NOT NULL,
    `approved` ENUM('APPROVED', 'NOT_APPROVED') NOT NULL DEFAULT 'NOT_APPROVED',

    INDEX `dentistas_procedimentos_procedureId_fkey`(`procedureId`),
    PRIMARY KEY (`dentistId`, `procedureId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `convenios` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes` (
    `id` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `health_insurance_card_number` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `pacientes_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes_convenios` (
    `patientId` VARCHAR(191) NOT NULL,
    `healthInsuranceId` VARCHAR(191) NOT NULL,

    INDEX `pacientes_convenios_healthInsuranceId_fkey`(`healthInsuranceId`),
    PRIMARY KEY (`patientId`, `healthInsuranceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historico_medico` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_up` DATETIME(3) NOT NULL,
    `dentistId` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,

    INDEX `historico_medico_dentistId_fkey`(`dentistId`),
    INDEX `historico_medico_patientId_fkey`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `secretarias` ADD CONSTRAINT `secretarias_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dentistas` ADD CONSTRAINT `dentistas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dentistas_procedimentos` ADD CONSTRAINT `dentistas_procedimentos_dentistId_fkey` FOREIGN KEY (`dentistId`) REFERENCES `dentistas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dentistas_procedimentos` ADD CONSTRAINT `dentistas_procedimentos_procedureId_fkey` FOREIGN KEY (`procedureId`) REFERENCES `procedimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes_convenios` ADD CONSTRAINT `pacientes_convenios_healthInsuranceId_fkey` FOREIGN KEY (`healthInsuranceId`) REFERENCES `convenios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes_convenios` ADD CONSTRAINT `pacientes_convenios_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `pacientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historico_medico` ADD CONSTRAINT `historico_medico_dentistId_fkey` FOREIGN KEY (`dentistId`) REFERENCES `dentistas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historico_medico` ADD CONSTRAINT `historico_medico_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `pacientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
