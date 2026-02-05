import { districts } from "../../data/districts";
import { divisionalSecretariats } from "../../data/divisional-secretariats";
import { gramaNiladhariDivisions } from "../../data/grama-niladhari-divisions";
import { villages } from "../../data/villages";
import { postalCodes } from "../../data/postal-codes";

/* -------------------------------------------------
   Index Containers
------------------------------------------------- */

export const districtsByProvinceId = new Map<string, string[]>();
export const dsByDistrictId = new Map<string, string[]>();
export const gnByDivisionalSecretariatId = new Map<string, string[]>();
export const villagesByGramaNiladhariId = new Map<string, typeof villages>();
export const postalCodesByDistrictId = new Map<string, typeof postalCodes>();

/* -------------------------------------------------
   Build Indexes
------------------------------------------------- */

export function buildIndexes(): void {
  /* Districts → Province */
  for (const d of districts) {
    if (!districtsByProvinceId.has(d.provinceId)) {
      districtsByProvinceId.set(d.provinceId, []);
    }
    districtsByProvinceId.get(d.provinceId)!.push(d.id);
  }

  /* DS → District */
  for (const ds of divisionalSecretariats) {
    if (!dsByDistrictId.has(ds.districtId)) {
      dsByDistrictId.set(ds.districtId, []);
    }
    dsByDistrictId.get(ds.districtId)!.push(ds.id);
  }

  /* GN → DS */
  for (const gn of gramaNiladhariDivisions) {
    if (!gnByDivisionalSecretariatId.has(gn.divisionalSecretariatId)) {
      gnByDivisionalSecretariatId.set(gn.divisionalSecretariatId, []);
    }
    gnByDivisionalSecretariatId
      .get(gn.divisionalSecretariatId)!
      .push(gn.id);
  }

  /* Villages → GN */
  for (const v of villages) {
    if (!villagesByGramaNiladhariId.has(v.gramaNiladhariDivisionId)) {
      villagesByGramaNiladhariId.set(v.gramaNiladhariDivisionId, []);
    }
    villagesByGramaNiladhariId.get(v.gramaNiladhariDivisionId)!.push(v);
  }

  /* Postal Codes → District */
  for (const p of postalCodes) {
    if (!postalCodesByDistrictId.has(p.districtId)) {
      postalCodesByDistrictId.set(p.districtId, []);
    }
    postalCodesByDistrictId.get(p.districtId)!.push(p);
  }
}

/* -------------------------------------------------
   Initialize immediately (singleton)
------------------------------------------------- */

buildIndexes();
