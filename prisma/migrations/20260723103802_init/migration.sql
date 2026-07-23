-- CreateEnum
CREATE TYPE "MedicalPaymentStatus" AS ENUM ('pending_payment', 'paid', 'failed');

-- CreateEnum
CREATE TYPE "CounselingStatus" AS ENUM ('not_scheduled', 'scheduled', 'completed');

-- CreateEnum
CREATE TYPE "NeetCategory" AS ENUM ('General', 'OBC', 'SC', 'ST', 'EWS');

-- CreateTable
CREATE TABLE "BtechApplication" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "yearOfPassing" INTEGER NOT NULL,
    "percentageOrCgpa" TEXT NOT NULL,
    "entranceExamName" TEXT,
    "entranceExamScore" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BtechApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalApplication" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "neetScore" INTEGER NOT NULL,
    "neetRollNumber" TEXT NOT NULL,
    "neetYear" INTEGER NOT NULL,
    "category" "NeetCategory" NOT NULL,
    "guardianName" TEXT NOT NULL,
    "guardianPhone" TEXT NOT NULL,
    "status" "MedicalPaymentStatus" NOT NULL DEFAULT 'pending_payment',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "amountPaise" INTEGER NOT NULL DEFAULT 500000,
    "paidAt" TIMESTAMP(3),
    "counselingStatus" "CounselingStatus" NOT NULL DEFAULT 'not_scheduled',
    "counselingNotes" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicalApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BtechApplication_referenceId_key" ON "BtechApplication"("referenceId");

-- CreateIndex
CREATE INDEX "BtechApplication_email_idx" ON "BtechApplication"("email");

-- CreateIndex
CREATE INDEX "BtechApplication_phone_idx" ON "BtechApplication"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalApplication_referenceId_key" ON "MedicalApplication"("referenceId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalApplication_razorpayOrderId_key" ON "MedicalApplication"("razorpayOrderId");

-- CreateIndex
CREATE INDEX "MedicalApplication_email_idx" ON "MedicalApplication"("email");

-- CreateIndex
CREATE INDEX "MedicalApplication_phone_idx" ON "MedicalApplication"("phone");

-- CreateIndex
CREATE INDEX "MedicalApplication_status_idx" ON "MedicalApplication"("status");

-- CreateIndex
CREATE INDEX "MedicalApplication_counselingStatus_idx" ON "MedicalApplication"("counselingStatus");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
