import { describe, it, expect } from 'vitest';
import {
  getVillages,
  getVillagesByGN,
  getVillagePath,
} from "../src";
import { testDataset } from "./fixtures/dataset";
import { buildIndexes } from "../src";

describe("Village access", () => {
  const indexes = buildIndexes(testDataset);

  it("returns all villages", () => {
    const villages = getVillages(testDataset);
    expect(villages.length).toBe(2);
  });

  it("returns villages by GN", () => {
    const villages = getVillagesByGN("GN1", indexes);
    expect(villages.length).toBe(2);
  });

  it("resolves full village path", () => {
    const path = getVillagePath("V1", indexes);
    expect(path?.province.name).toBe("Central");
    expect(path?.district.name).toBe("Kandy");
    expect(path?.village.name).toBe("Achchuvely");
  });
});
