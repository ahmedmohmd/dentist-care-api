-- CreateTable
CREATE TABLE "DailyDates" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DailyDates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyDates_date_key" ON "DailyDates"("date");
