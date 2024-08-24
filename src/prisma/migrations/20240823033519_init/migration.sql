-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN,
    "token" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
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
    "contact" TEXT NOT NULL,
    "address" TEXT,
    "area" TEXT,
    "city" TEXT,
    "pincode" TEXT,
    "contact_person_name" TEXT,
    "contact_person_contact" TEXT,
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
    "no_of_materials" INTEGER NOT NULL,
    "dc_number" INTEGER NOT NULL,
    "dc_image" TEXT,
    "received_date" TIMESTAMP(3) NOT NULL,
    "estimated_dispatch_date" TIMESTAMP(3) NOT NULL,
    "coating_required" TEXT,
    "inspection" TEXT,
    "is_qty_approved" INTEGER,
    "rejection_reason" TEXT,
    "job_id" TEXT,
    "job_type_id" INTEGER NOT NULL,
    "job_status" TEXT,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_inward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_inward_details" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "thickness" TEXT NOT NULL,

    CONSTRAINT "material_inward_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_production" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "received_qty" INTEGER,
    "balance_qty" INTEGER,
    "completed_qty" INTEGER,
    "assigned_floor" TEXT,
    "assigned_shift" TEXT,
    "date" TEXT,
    "shift_incharge" INTEGER NOT NULL,
    "remarks" TEXT,
    "required_coating" TEXT,
    "achived_coating" TEXT,
    "zinc_starting_level" TEXT,
    "zinc_ending_level" TEXT,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_filing" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "received_qty" INTEGER,
    "balance_qty" INTEGER,
    "completed_qty" INTEGER,
    "assigned_floor" TEXT,
    "assigned_shift" TEXT,
    "date" TEXT,
    "shift_incharge" INTEGER NOT NULL,
    "remarks" TEXT,
    "contractor" TEXT,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_filing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "unit" TEXT NOT NULL,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "type" TEXT,
    "color" TEXT,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_inward" ADD CONSTRAINT "material_inward_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_inward" ADD CONSTRAINT "material_inward_job_type_id_fkey" FOREIGN KEY ("job_type_id") REFERENCES "job_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_inward_details" ADD CONSTRAINT "material_inward_details_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_production" ADD CONSTRAINT "material_production_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_production" ADD CONSTRAINT "material_production_shift_incharge_fkey" FOREIGN KEY ("shift_incharge") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_filing" ADD CONSTRAINT "material_filing_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_filing" ADD CONSTRAINT "material_filing_shift_incharge_fkey" FOREIGN KEY ("shift_incharge") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
