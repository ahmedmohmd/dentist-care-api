import "dotenv/config";
import express from "express";
import prisma from "../db/db";

import globalErrorHandler from "./controllers/global-error-handler.controller";
import checkupsRouter from "./routes/checkups.route";
import dailyDatesRouter from "./routes/daily-dates.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/checkups", checkupsRouter);
app.use("/api/daily-dates", dailyDatesRouter);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

async function main() {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
