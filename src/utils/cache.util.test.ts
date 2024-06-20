import { describe } from "node:test";
import { expect, it, vi } from "vitest";
import redisClient from "../../db/__mocks__/redis";
import cacheUtil from "./cache.util";

vi.mock("../../db/redis.ts");

describe("set()", () => {
  it("Should call set() method", async () => {
    await cacheUtil.set("key", { value: "value" });

    expect(redisClient.set).toBeCalledTimes(1);
  });
});

describe("get()", () => {
  it("Should return undefined if the key is undefined", async () => {
    const key = undefined;

    const result = await cacheUtil.get(key);

    expect(result).toBeUndefined();
  });

  it("Should return null if the key does not exist", async () => {
    const key = "key";

    redisClient.get.mockResolvedValue(null);

    const result = await cacheUtil.get(key);

    expect(result).toBeNull();
  });

  it("Should return the value if the key exists", async () => {
    const key = "key";
    const data = {
      name: "key",
      value: "value",
    };

    redisClient.get.mockResolvedValueOnce(JSON.stringify(data));

    const result = await cacheUtil.get(key);

    expect(result).toEqual(data);
  });
});
