import { beforeEach, describe, expect, it, vi } from "vitest";
import checkCheckupsQueryParams from "./check-checkups-query-params.util";

const response: any = {};

const status = vi.fn().mockReturnValue(response);
const json = vi.fn().mockReturnValue(response);

response.status = status;
response.json = json;

let request: Partial<
  | Partial<Request>
  | Partial<{
      query: Partial<{ page: string; limit: string; sort: string }>;
    }>
> = {
  query: {
    page: "1",
    limit: "10",
    sort: "desc",
  },
};

let expectedResult = {
  skip: 0,
  take: 10,
  sortingOrder: "desc",
};

beforeEach(() => {
  request = {
    query: {
      page: "1",
      limit: "10",
      sort: "desc",
    },
  };

  expectedResult = {
    skip: 0,
    take: 10,
    sortingOrder: "desc",
  };
});

describe("checkCheckupsQueryParams()", () => {
  it("Should. return the true result", () => {
    const result = checkCheckupsQueryParams(request as any, {} as any);

    expect(result).toEqual(expectedResult);
  });

  it("Should. return error of the page param is NaN", () => {
    (request as any).query.page = "notANumber";

    const result = checkCheckupsQueryParams(request as any, response as any);

    expect(result).not.toEqual(expectedResult);
  });

  it("Should. return error of the limit param is NaN", () => {
    (request as any).query.limit = "notANumber";

    const result = checkCheckupsQueryParams(request as any, response as any);

    expect(result).not.toEqual(expectedResult);
  });

  it("Should. return error if sort param is not 'asc' or 'desc'", () => {
    (request as any).query.sort = "notAscOrDesc";

    const result = checkCheckupsQueryParams(request as any, response as any);

    expect(result).not.toEqual(expectedResult);
  });
});
