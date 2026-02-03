import {
  Dataset,
  DatasetIndexes,
  Province,
  District,
  DivisionalSecretariat,
  GramaNiladhariDivision,
  Village,
} from "../types/models";

/* ============================================================
   Index Builder
   ============================================================ */

/**
 * Build all lookup indexes for the dataset.
 * This function should be called ONCE and reused.
 */
export function buildIndexes(dataset: Dataset): DatasetIndexes {
  /* -----------------------
     Flat ID maps
     ----------------------- */

  const provinceById = new Map<string, Province>();
  const districtById = new Map<string, District>();
  const dsById = new Map<string, DivisionalSecretariat>();
  const gnById = new Map<string, GramaNiladhariDivision>();
  const villageById = new Map<string, Village>();

  /* -----------------------
     Parent → children maps
     ----------------------- */

  const districtsByProvince = new Map<string, District[]>();
  const dsByDistrict = new Map<string, DivisionalSecretariat[]>();
  const gnByDS = new Map<string, GramaNiladhariDivision[]>();
  const villagesByGN = new Map<string, Village[]>();

  /* ============================================================
     Provinces
     ============================================================ */

  for (const province of dataset.provinces) {
    provinceById.set(province.id, province);
    districtsByProvince.set(province.id, []);
  }

  /* ============================================================
     Districts
     ============================================================ */

  for (const district of dataset.districts) {
    districtById.set(district.id, district);

    if (!districtsByProvince.has(district.provinceId)) {
      districtsByProvince.set(district.provinceId, []);
    }

    districtsByProvince.get(district.provinceId)!.push(district);
    dsByDistrict.set(district.id, []);
  }

  /* ============================================================
     Divisional Secretariats
     ============================================================ */

  for (const ds of dataset.divisionalSecretariats) {
    dsById.set(ds.id, ds);

    if (!dsByDistrict.has(ds.districtId)) {
      dsByDistrict.set(ds.districtId, []);
    }

    dsByDistrict.get(ds.districtId)!.push(ds);
    gnByDS.set(ds.id, []);
  }

  /* ============================================================
     Grama Niladhari Divisions
     ============================================================ */

  for (const gn of dataset.gramaNiladhariDivisions) {
    gnById.set(gn.id, gn);

    if (!gnByDS.has(gn.divisionalSecretariatId)) {
      gnByDS.set(gn.divisionalSecretariatId, []);
    }

    gnByDS.get(gn.divisionalSecretariatId)!.push(gn);
    villagesByGN.set(gn.id, []);
  }

  /* ============================================================
     Villages
     ============================================================ */

  for (const village of dataset.villages) {
    villageById.set(village.id, village);

    if (!villagesByGN.has(village.gramaNiladhariDivisionId)) {
      villagesByGN.set(village.gramaNiladhariDivisionId, []);
    }

    villagesByGN.get(village.gramaNiladhariDivisionId)!.push(village);
  }

  /* ============================================================
     Return all indexes
     ============================================================ */

  return {
    provinceById,
    districtById,
    dsById,
    gnById,
    villageById,

    districtsByProvince,
    dsByDistrict,
    gnByDS,
    villagesByGN,
  };
}
