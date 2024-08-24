/*
  Warnings:

  - The `status` column on the `material_production` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "material_production" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER;
