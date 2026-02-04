import { Dataset } from "../../src/types/models";

export const testDataset: Dataset = {
  provinces: [
    { id: "P1", name: "Central" },
  ],

  districts: [
    { id: "D1", name: "Kandy", provinceId: "P1" },
  ],

  divisionalSecretariats: [
    { id: "DS1", name: "Akurana", districtId: "D1" },
  ],

  gramaNiladhariDivisions: [
    { id: "GN1", name: "Akurana East", divisionalSecretariatId: "DS1" },
  ],

  villages: [
    { id: "V1", name: "Achchuvely", gramaNiladhariDivisionId: "GN1" },
    { id: "V2", name: "Achchuvely", gramaNiladhariDivisionId: "GN1" },
  ],

  postalCodes: [
    {
      code: "40150",
      name: "Achchuvely",
      districtId: "D1",
    },
  ],
};
