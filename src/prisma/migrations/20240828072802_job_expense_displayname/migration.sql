/*
  Warnings:

  - You are about to drop the column `achived_coating` on the `material_production` table. All the data in the column will be lost.
  - You are about to drop the column `required_coating` on the `material_production` table. All the data in the column will be lost.
  - You are about to drop the column `zinc_ending_level` on the `material_production` table. All the data in the column will be lost.
  - You are about to drop the column `zinc_starting_level` on the `material_production` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "material_production" DROP COLUMN "achived_coating",
DROP COLUMN "required_coating",
DROP COLUMN "zinc_ending_level",
DROP COLUMN "zinc_starting_level";
