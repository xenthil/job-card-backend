/*
  Warnings:

  - The `assigned_floor` column on the `material_production` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `assigned_shift` column on the `material_production` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "material_production" DROP COLUMN "assigned_floor",
ADD COLUMN     "assigned_floor" INTEGER,
DROP COLUMN "assigned_shift",
ADD COLUMN     "assigned_shift" INTEGER;

-- AddForeignKey
ALTER TABLE "material_production" ADD CONSTRAINT "material_production_assigned_floor_fkey" FOREIGN KEY ("assigned_floor") REFERENCES "floor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_production" ADD CONSTRAINT "material_production_assigned_shift_fkey" FOREIGN KEY ("assigned_shift") REFERENCES "shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
