/* ============================================================
   sl-address-utils – Public API
   ============================================================ */

/* -----------------------
   Types
   ----------------------- */
export * from "./types/models";

/* -----------------------
   Index Builder
   ----------------------- */
export { buildIndexes } from "./indexes/buildIndexes";

/* -----------------------
   Province Access
   ----------------------- */
export {
  getProvinces,
  getProvinceById,
  getProvinceByName,
  buildProvinceNode,
  buildAllProvinceNodes,
  assertProvinceExists,
} from "./access/provinces";

/* -----------------------
   District Access
   ----------------------- */
export {
  getDistricts,
  getDistrictById,
  getDistrictByName,
  getDistrictsByProvince,
  buildDistrictNode,
  buildDistrictNodesByProvince,
  assertDistrictExists,
} from "./access/districts";

/* -----------------------
   Divisional Secretariat Access
   ----------------------- */
export {
  getDivisionalSecretariats,
  getDivisionalSecretariatById,
  getDivisionalSecretariatByName,
  getDivisionalSecretariatsByDistrict,
  buildDivisionalSecretariatNode,
  buildDivisionalSecretariatNodesByDistrict,
  assertDivisionalSecretariatExists,
} from "./access/divisionalSecretariats";

/* -----------------------
   Grama Niladhari Access
   ----------------------- */
export {
  getGramaNiladhariDivisions,
  getGramaNiladhariDivisionById,
  getGramaNiladhariDivisionByName,
  getGramaNiladhariDivisionsByDS,
  getVillagesByGramaNiladhari,
  buildGramaNiladhariNode,
  buildGramaNiladhariNodesByDS,
  assertGramaNiladhariExists,
} from "./access/gramaNiladhari";

/* -----------------------
   Village Access
   ----------------------- */
export {
  getVillages,
  getVillageById,
  getVillagesByName,
  getVillagesByGN,
  getVillagesByDistrict,
  getVillagePath,
  assertVillageExists,
} from "./access/villages";

/* -----------------------
   Postal Code Access
   ----------------------- */
export {
  getPostalCodes,
  getPostalCodeByCode,
  getPostalCodesByDistrict,
  getDistrictByPostalCode,
  getProvinceByPostalCode,
  assertPostalCodeExists,
} from "./access/postalCodes";
