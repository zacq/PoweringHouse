-- CreateEnum
CREATE TYPE "OfferLine" AS ENUM ('BUSINESS_GROWTH_DESIGN', 'OPERATIONS_EXCELLENCE', 'BOTH');

-- CreateEnum
CREATE TYPE "OfferCtaType" AS ENUM ('ENQUIRY_FORM', 'EXTERNAL_LINK', 'INTERNAL_LINK');

-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "offerLine" "OfferLine" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "showInMarketPlace" BOOLEAN NOT NULL DEFAULT true,
    "promise" TEXT NOT NULL,
    "whoFor" TEXT NOT NULL,
    "whoNotFor" TEXT NOT NULL,
    "whatHappens" TEXT NOT NULL,
    "commitment" TEXT,
    "price" TEXT,
    "priceIsDraft" BOOLEAN NOT NULL DEFAULT true,
    "story" TEXT,
    "storyIsDraft" BOOLEAN NOT NULL DEFAULT true,
    "ctaType" "OfferCtaType" NOT NULL,
    "ctaLabel" TEXT,
    "externalUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "businessName" TEXT,
    "message" TEXT,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Offer_slug_key" ON "Offer"("slug");

-- CreateIndex
CREATE INDEX "Offer_offerLine_idx" ON "Offer"("offerLine");

-- CreateIndex
CREATE INDEX "Offer_published_order_idx" ON "Offer"("published", "order");

-- CreateIndex
CREATE INDEX "Enquiry_offerId_idx" ON "Enquiry"("offerId");

-- CreateIndex
CREATE INDEX "Enquiry_status_idx" ON "Enquiry"("status");

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

