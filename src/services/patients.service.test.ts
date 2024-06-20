import { describe, expect, it, vi } from "vitest";
import prisma from "../../db/__mocks__/prisma";
import { CreatePatient, UpdatePatient } from "../dto/patients.dto";
import patientsService from "./patients.service";

vi.mock("../../db/prisma.ts");

describe("getAllPatients()", () => {
  it("should return an array of patients", async () => {
    const expectedPatients = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "jg6Xh@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
        role: "PATIENT",
        createdAt: "2020-01-01T00:00:00.000Z",
        updatedAt: "2020-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        email: "jg6Xh@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
        role: "PATIENT",
        createdAt: "2020-01-01T00:00:00.000Z",
        updatedAt: "2020-01-01T00:00:00.000Z",
      },
    ];

    prisma.user.findMany.mockResolvedValueOnce(expectedPatients as any);
    const result = await patientsService.getAllPatients({
      skip: 0,
      take: 2,
      sortingOrder: "desc",
    });

    expect(result).toEqual(expectedPatients);
  });
});

describe("getSinglePatient()", () => {
  it("should return a patient", async () => {
    const patientId = 1;
    const expectedPatient = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "PATIENT",
      createdAt: "2020-01-01T00:00:00.000Z",
      updatedAt: "2020-01-01T00:00:00.000Z",
    };

    prisma.user.findUnique.mockResolvedValueOnce(expectedPatient as any);
    const result = await patientsService.getSinglePatient(patientId);

    expect(result).toEqual(expectedPatient);
  });
});

describe("createPatient()", () => {
  it("should create a patient", async () => {
    const patient: CreatePatient = {
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      password: "12345678",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "PATIENT",
    };
    const expectedPatient = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      phoneNumber: "1234567890",
      password: "12345678",
      address: "123 Main St",
      role: "PATIENT",
      createdAt: "2020-01-01T00:00:00.000Z",
      updatedAt: "2020-01-01T00:00:00.000Z",
    };

    prisma.user.create.mockResolvedValueOnce(expectedPatient as any);
    const result = await patientsService.createPatient(patient);

    expect(result).toEqual(expectedPatient);
  });
});

describe("updatePatient()", () => {
  it("should update a patient", async () => {
    const patientId = 1;
    const patientData: UpdatePatient = {
      firstName: "John",
    };
    const expectedPatient = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      password: "12345678",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "PATIENT",
      createdAt: "2020-01-01T00:00:00.000Z",
      updatedAt: "2020-01-01T00:00:00.000Z",
    };

    prisma.user.update.mockResolvedValueOnce(expectedPatient as any);
    const result = await patientsService.updatePatient(patientId, patientData);

    expect(result).toEqual(expectedPatient);
  });
});

describe("deletePatient()", () => {
  it("should delete a patient", async () => {
    const patientId = 1;
    const expectedPatient = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jg6Xh@example.com",
      password: "12345678",
      phoneNumber: "1234567890",
      address: "123 Main St",
      role: "PATIENT",
      createdAt: "2020-01-01T00:00:00.000Z",
      updatedAt: "2020-01-01T00:00:00.000Z",
    };

    prisma.user.delete.mockResolvedValueOnce(expectedPatient as any);
    const result = await patientsService.deletePatient(patientId);

    expect(result).toEqual(expectedPatient);
  });
});
