enum CheckType {
  EXAMINATION = "EXAMINATION",
  CONSULTATION = "CONSULTATION",
}

type CreateCheckup = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  date: string;
  type: CheckType;
  patientId: number;
};

type UpdateCheckup = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  date?: string;
  type?: CheckType;
};

export { CreateCheckup, UpdateCheckup };
