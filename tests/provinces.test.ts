import { describe, it, expect } from 'vitest';
import {
  getProvinces,
  getProvinceByName,
} from "../src";
import { testDataset } from "./fixtures/dataset";

describe("Province access", () => {
  it("returns all provinces", () => {
    const provinces = getProvinces(testDataset);
    expect(provinces.length).toBe(1);
  });

  it("finds province by name (case-insensitive)", () => {
    const province = getProvinceByName("central", testDataset);
    expect(province?.id).toBe("P1");
  });
});
