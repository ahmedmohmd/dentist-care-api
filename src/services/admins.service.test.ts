import { describe, expect, it, vi } from "vitest";
import prisma from "../../db/__mocks__/prisma";
import adminsService from "./admins.service";

vi.mock("../../db/prisma.ts");

describe("getSingleAdmin()", () => {
  it("should return an admin", async () => {
    const adminId = 1;
    const expectedAdmin = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "PATIENT",
    };

    prisma.user.findUnique.mockResolvedValueOnce(expectedAdmin as any);
    const result = await adminsService.getSingleAdmin(adminId);

    expect(result).toEqual(expectedAdmin);
  });
});

describe("updateAdmin()", () => {
  it("should update an admin", async () => {
    const adminId = 1;
    const data = {
      firstName: "Jack",
    };
    const expectedAdmin = {
      id: 1,
      firstName: "Jack",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "PATIENT",
    };

    prisma.user.update.mockResolvedValueOnce(expectedAdmin as any);
    const result = await adminsService.updateAdmin(adminId, data as any);

    expect(result).toEqual(expectedAdmin);
  });
});

describe("deleteAdmin()", () => {
  it("should delete an admin", async () => {
    const adminId = 1;
    const expectedAdmin = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "PATIENT",
    };

    prisma.user.delete.mockResolvedValueOnce(expectedAdmin as any);
    const result = await adminsService.deleteAdmin(adminId);

    expect(result).toEqual(expectedAdmin);
  });
});

describe("convertToAdmin()", () => {
  it("should convert a moderator to an admin", async () => {
    const moderatorId = 1;
    const expectedAdmin = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "ADMIN",
    };

    prisma.user.update.mockResolvedValueOnce(expectedAdmin as any);
    const result = await adminsService.convertToAdmin(moderatorId);

    expect(result).toEqual(expectedAdmin);
  });
});

describe("convertToModerator()", () => {
  it("should convert an admin to a moderator", async () => {
    const adminId = 1;
    const expectedModerator = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "MODERATOR",
    };

    prisma.user.update.mockResolvedValueOnce(expectedModerator as any);
    const result = await adminsService.convertToModerator(adminId);

    expect(result).toEqual(expectedModerator);
  });
});
