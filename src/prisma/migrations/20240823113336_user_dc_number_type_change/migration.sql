-- AlterTable
ALTER TABLE "material_inward" ALTER COLUMN "dc_number" DROP NOT NULL,
ALTER COLUMN "dc_number" SET DATA TYPE TEXT;
