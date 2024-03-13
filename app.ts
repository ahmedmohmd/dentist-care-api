import "dotenv/config";
import express from "express";
import prisma from "./db/db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
