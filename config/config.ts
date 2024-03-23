enum UserRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  PATIENT = "PATIENT",
}

enum CheckupType {
  EXAMINATION = "EXAMINATION",
  CONSULTATION = "CONSULTATION",
}

const config = {
  limit: 2,
  userRole: UserRole,
  checkupType: CheckupType,
};

export default config;
