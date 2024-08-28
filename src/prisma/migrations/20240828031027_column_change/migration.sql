-- DropForeignKey
ALTER TABLE "material_filing" DROP CONSTRAINT "material_filing_material_inward_id_fkey";

-- DropForeignKey
ALTER TABLE "material_production" DROP CONSTRAINT "material_production_material_inward_id_fkey";

-- AddForeignKey
ALTER TABLE "material_production" ADD CONSTRAINT "material_production_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_filing" ADD CONSTRAINT "material_filing_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
