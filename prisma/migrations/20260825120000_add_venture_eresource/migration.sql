-- CreateEnum
CREATE TYPE "EResourceAccess" AS ENUM ('OPEN', 'GATED');

-- CreateTable
CREATE TABLE "Venture" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "before" TEXT NOT NULL,
    "after" TEXT NOT NULL,
    "metricLabel" TEXT NOT NULL,
    "metricBefore" TEXT NOT NULL,
    "metricAfter" TEXT NOT NULL,
    "consentOnFile" BOOLEAN NOT NULL DEFAULT false,
    "photo" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EResource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "access" "EResourceAccess" NOT NULL DEFAULT 'OPEN',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Venture_published_order_idx" ON "Venture"("published", "order");

-- CreateIndex
CREATE INDEX "EResource_published_publishedAt_idx" ON "EResource"("published", "publishedAt");

