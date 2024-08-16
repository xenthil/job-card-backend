-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status" DROP NOT NULL;

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_address" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "email" TEXT,
    "conatact" INTEGER NOT NULL,
    "address" TEXT,
    "area" TEXT,
    "city" TEXT,
    "pincode" INTEGER,
    "contact_person_name" TEXT,
    "contact_person_contact" TEXT,
    "contact_person_email" TEXT,
    "description" TEXT,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_inward" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dc_image" TEXT,
    "received_date" TIMESTAMP(3) NOT NULL,
    "estimated_dispatch_date" TIMESTAMP(3) NOT NULL,
    "material_numbers" INTEGER,
    "is_qty_approved" INTEGER,
    "rejection_reason" TEXT NOT NULL,
    "job_id" TEXT,
    "job_type" TEXT,
    "job_status" TEXT,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_inward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_inward" ADD CONSTRAINT "material_inward_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
