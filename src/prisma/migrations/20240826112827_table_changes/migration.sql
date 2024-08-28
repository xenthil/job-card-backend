/*
  Warnings:

  - You are about to drop the column `coating_required` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_dispatch_date` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `inspection` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `is_qty_approved` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `job_status` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `job_type_id` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `no_of_materials` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `received_date` on the `material_inward` table. All the data in the column will be lost.
  - You are about to drop the column `rejection_reason` on the `material_inward` table. All the data in the column will be lost.
  - Added the required column `estimated_dispatch_date` to the `material_inward_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_type_id` to the `material_inward_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `material_inward_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `received_date` to the `material_inward_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "material_inward" DROP CONSTRAINT "material_inward_job_type_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_floor_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_shift_id_fkey";

-- AlterTable
ALTER TABLE "material" ADD COLUMN     "displayName" TEXT;

-- AlterTable
ALTER TABLE "material_inward" DROP COLUMN "coating_required",
DROP COLUMN "estimated_dispatch_date",
DROP COLUMN "inspection",
DROP COLUMN "is_qty_approved",
DROP COLUMN "job_id",
DROP COLUMN "job_status",
DROP COLUMN "job_type_id",
DROP COLUMN "no_of_materials",
DROP COLUMN "quantity",
DROP COLUMN "received_date",
DROP COLUMN "rejection_reason";

-- AlterTable
ALTER TABLE "material_inward_details" ADD COLUMN     "estimated_dispatch_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "inspection" TEXT,
ADD COLUMN     "job_id" TEXT,
ADD COLUMN     "job_status" TEXT,
ADD COLUMN     "job_type_id" INTEGER NOT NULL,
ADD COLUMN     "length" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "received_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "shift_id" DROP NOT NULL,
ALTER COLUMN "floor_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "jobtype_material" (
    "id" SERIAL NOT NULL,
    "jobTypeId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobtype_material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_expenses" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "materialInward_details_id" INTEGER NOT NULL,
    "expectedQty" INTEGER NOT NULL,
    "usedQty" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_inward_details" ADD CONSTRAINT "material_inward_details_job_type_id_fkey" FOREIGN KEY ("job_type_id") REFERENCES "job_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_expenses" ADD CONSTRAINT "job_expenses_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_expenses" ADD CONSTRAINT "job_expenses_materialInward_details_id_fkey" FOREIGN KEY ("materialInward_details_id") REFERENCES "material_inward_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
