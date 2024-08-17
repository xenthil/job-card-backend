-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN,
    "token" TEXT,
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

-- CreateTable
CREATE TABLE "Material_inward_details" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "material_dc_number" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "thickness" TEXT NOT NULL,
    "material_qty" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Material_inward_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_process" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "received_qty" INTEGER NOT NULL,
    "assigned_type" TEXT NOT NULL,
    "balance_qty" INTEGER,
    "completed_qty" INTEGER NOT NULL,
    "assigned_floor" TEXT,
    "assigned_shift" TEXT NOT NULL,
    "manager" TEXT,

    CONSTRAINT "material_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_filing" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "received_qty" INTEGER NOT NULL,
    "assigned_type" TEXT NOT NULL,
    "balance_qty" INTEGER,
    "completed_qty" INTEGER NOT NULL,
    "assigned_floor" TEXT,
    "assigned_shift" TEXT NOT NULL,
    "manager" TEXT,

    CONSTRAINT "material_filing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_dispatch" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "received_qty" INTEGER NOT NULL,
    "assigned_type" TEXT NOT NULL,
    "balance_qty" INTEGER,
    "completed_qty" INTEGER NOT NULL,
    "assigned_floor" TEXT,
    "assigned_shift" TEXT NOT NULL,
    "manager" TEXT,

    CONSTRAINT "material_dispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expected_material_expenses" (
    "id" SERIAL NOT NULL,
    "material_inward_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "expected_material_expenses_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "inventory_details" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_details" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "received_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_inward" ADD CONSTRAINT "material_inward_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material_inward_details" ADD CONSTRAINT "Material_inward_details_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_process" ADD CONSTRAINT "material_process_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_filing" ADD CONSTRAINT "material_filing_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_dispatch" ADD CONSTRAINT "material_dispatch_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expected_material_expenses" ADD CONSTRAINT "expected_material_expenses_material_inward_id_fkey" FOREIGN KEY ("material_inward_id") REFERENCES "material_inward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expected_material_expenses" ADD CONSTRAINT "expected_material_expenses_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_details" ADD CONSTRAINT "inventory_details_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_details" ADD CONSTRAINT "purchase_details_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_details" ADD CONSTRAINT "purchase_details_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
