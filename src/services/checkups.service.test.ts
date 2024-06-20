import { describe, expect, it, vi } from "vitest";
import enumsConfig from "../../config/enums.config";
import prisma from "../../db/__mocks__/prisma";
import { CreateCheckup, UpdateCheckup } from "../dto/checkups.dto";
import checkupsService from "./checkups.service";

vi.mock("../../db/prisma.ts");

describe("getAllCheckups()", () => {
  it("Should Return All Checkups", async () => {
    const expectedResult = [
      { id: 1, userId: 1, date: "2022-02-12", type: "EXAMINATION" },
      { id: 2, userId: 2, date: "2022-02-13", type: "CONSULTATION" },
    ];

    prisma.checkup.findMany.mockResolvedValue(expectedResult as any);
    const checkups = await checkupsService.getAllCheckups(0, 10);

    expect(checkups).toEqual(expectedResult);
  });
});

describe("getAllPatientCheckups()", () => {
  it("Should Return All Checkups For A Given Patient", async () => {
    const patientId = 1;
    const skip = 0;
    const take = 10;
    const expectedResult = [
      { id: 1, userId: patientId, date: "2022-02-12", type: "EXAMINATION" },
      { id: 2, userId: patientId, date: "2022-02-13", type: "CONSULTATION" },
    ];

    prisma.checkup.findMany.mockResolvedValue(expectedResult as any);
    const checkups = await checkupsService.getAllPatientCheckups(
      patientId,
      skip,
      take
    );

    expect(checkups).toEqual(expectedResult);
  });
});

describe("getSingleCheckup()", () => {
  it("Should Return A Single Checkup", async () => {
    const checkupId = 1;
    const patientId = 1;
    const expectedResult = {
      id: checkupId,
      userId: patientId,
      date: "2022-02-12",
      type: "EXAMINATION",
    };

    prisma.checkup.findFirst.mockResolvedValue(expectedResult as any);
    const checkup = await checkupsService.getSingleCheckup(
      checkupId,
      patientId
    );

    expect(checkup).toEqual(expectedResult);
  });
});

describe("getCheckupByPatientId()", () => {
  it("Should Return All Checkups For A Given Patient", async () => {
    const patientId = 1;
    const expectedResult = [
      { id: 1, userId: patientId, date: "2022-02-12", type: "EXAMINATION" },
      { id: 2, userId: patientId, date: "2022-02-13", type: "CONSULTATION" },
    ];

    prisma.checkup.findMany.mockResolvedValue(expectedResult as any);
    const checkups = await checkupsService.getCheckupByPatientId(patientId);

    expect(checkups).toEqual(expectedResult);
  });
});

describe("createCheckup()", () => {
  it("Should Create A Checkup For A Given Patient", async () => {
    const patientId = 1;
    const checkup: CreateCheckup = {
      date: "2022-02-14",
      type: enumsConfig.CheckupType.EXAMINATION as any,
      patientId: patientId,
    };
    const expectedResult = {
      id: 3,
      userId: patientId,
      date: checkup.date,
      type: checkup.type,
    };

    prisma.checkup.create.mockResolvedValue(expectedResult as any);
    const createdCheckup = await checkupsService.createCheckup(
      checkup,
      patientId
    );

    expect(createdCheckup).toEqual(expectedResult);
  });
});

describe("updateCheckup()", () => {
  it("Should Update A Checkup", async () => {
    const checkupId = 1;
    const patientId = 1;
    const checkup: UpdateCheckup = {
      date: "2022-02-15",
      type: enumsConfig.CheckupType.CONSULTATION as any,
    };
    const expectedResult = {
      id: checkupId,
      userId: patientId,
      date: checkup.date,
      type: checkup.type,
    };

    prisma.checkup.update.mockResolvedValue(expectedResult as any);
    const updatedCheckup = await checkupsService.updateCheckup(
      checkupId,
      patientId,
      checkup
    );

    expect(updatedCheckup).toEqual(expectedResult);
  });
});

describe("deleteCheckup()", () => {
  it("Should Delete A Checkup", async () => {
    const checkupId = 1;
    const patientId = 1;

    prisma.checkup.delete.mockResolvedValue({} as any);
    await checkupsService.deleteCheckup(checkupId, patientId);

    expect(prisma.checkup.delete).toHaveBeenCalledWith({
      where: { id: checkupId, userId: patientId },
    });
  });
});
