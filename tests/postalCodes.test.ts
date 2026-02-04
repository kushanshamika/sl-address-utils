import { describe, it, expect } from 'vitest';
import {
  getPostalCodeByCode,
  getProvinceByPostalCode,
} from "../src";
import { testDataset } from "./fixtures/dataset";
import { buildIndexes } from "../src";

describe("Postal code access", () => {
  const indexes = buildIndexes(testDataset);

  it("finds postal code by code", () => {
    const postal = getPostalCodeByCode("40150", testDataset);
    expect(postal?.name).toBe("Achchuvely");
  });

  it("resolves province from postal code", () => {
    const province = getProvinceByPostalCode(
      "40150",
      indexes,
      testDataset
    );
    expect(province?.name).toBe("Central");
  });
});
