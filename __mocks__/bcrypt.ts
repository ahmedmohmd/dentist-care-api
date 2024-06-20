import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(bcrypt);
});

const bcrypt = mockDeep<typeof import("bcrypt")>();

export default bcrypt;
