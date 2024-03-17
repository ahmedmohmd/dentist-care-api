import prisma from "../../db/db";

const getAllDates = () => {
  return prisma.dailyDates.findMany({
    where: {
      available: true,
    },
  });
};

const takeDate = (date: string) => {
  return prisma.dailyDates.update({
    where: {
      date: date,
    },

    data: {
      available: false,
    },
  });
};

const releaseDate = (date: string) => {
  return prisma.dailyDates.update({
    where: {
      date: date,
    },

    data: {
      available: true,
    },
  });
};

const releaseAllDates = () => {
  return prisma.dailyDates.updateMany({
    data: {
      available: true,
    },
  });
};

export default {
  getAllDates,
  takeDate,
  releaseDate,
  releaseAllDates,
};
