-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "postalCode" VARCHAR NOT NULL,
    "street" VARCHAR NOT NULL,
    "number" VARCHAR NOT NULL,
    "neighborhood" VARCHAR NOT NULL,
    "complement" VARCHAR,
    "city" VARCHAR NOT NULL,
    "state" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "category" VARCHAR NOT NULL,
    "cnpj" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "cellphone" VARCHAR NOT NULL,
    "clinicalManagerName" VARCHAR NOT NULL,
    "financialManagerName" VARCHAR NOT NULL,
    "addressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
