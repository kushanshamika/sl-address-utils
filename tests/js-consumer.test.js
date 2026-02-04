import { buildIndexes, getVillagesByGN } from "../dist/index.cjs";

test("JS consumer works", () => {
  const dataset = {
    provinces: [{ id: "P1", name: "Central" }],
    districts: [{ id: "D1", name: "Kandy", provinceId: "P1" }],
    divisionalSecretariats: [{ id: "DS1", name: "Akurana", districtId: "D1" }],
    gramaNiladhariDivisions: [{ id: "GN1", name: "East", divisionalSecretariatId: "DS1" }],
    villages: [{ id: "V1", name: "Test", gramaNiladhariDivisionId: "GN1" }],
  };

  const indexes = buildIndexes(dataset);
  const villages = getVillagesByGN("GN1", indexes);

  expect(villages.length).toBe(1);
});
