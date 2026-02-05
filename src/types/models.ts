/* ============================================================
   Core Administrative Models – Sri Lanka
   ============================================================ */

/** Common base fields for all entities */
export interface BaseEntity {
  id: string;
  name: string;
}

/* =======================
   Province
   ======================= */

export interface Province extends BaseEntity {}

/* =======================
   District
   ======================= */

export interface District extends BaseEntity {
  provinceId: string;
}

/* =======================
   Divisional Secretariat
   ======================= */

export interface DivisionalSecretariat extends BaseEntity {
  districtId: string;
}

/* =======================
   Grama Niladhari Division
   ======================= */

export interface GramaNiladhariDivision extends BaseEntity {
  divisionalSecretariatId: string;
}

/* =======================
   Village
   ======================= */

export interface Village extends BaseEntity {
  gramaNiladhariDivisionId: string;
}

/* =======================
   Postal Code
   ======================= */

export interface PostalCode {
  code: string;
  districtId: string;
  name: string;
}

/* =======================
   Hierarchy Tree Types
   ======================= */

export interface VillageNode extends Village {}

export interface GramaNiladhariNode extends GramaNiladhariDivision {
  villages: VillageNode[];
}

export interface DivisionalSecretariatNode extends DivisionalSecretariat {
  gramaNiladhariDivisions: GramaNiladhariNode[];
}

export interface DistrictNode extends District {
  divisionalSecretariats: DivisionalSecretariatNode[];
}

export interface ProvinceNode extends Province {
  districts: DistrictNode[];
}

/* =======================
   Lookup / Path Result
   ======================= */

export interface AddressPath {
  province: Province;
  district: District;
  divisionalSecretariat: DivisionalSecretariat;
  gramaNiladhariDivision: GramaNiladhariDivision;
  village: Village;
}

/* =======================
   Search Result Types
   ======================= */

export interface VillageSearchResult {
  village: Village;
  gn: GramaNiladhariDivision;
  ds: DivisionalSecretariat;
  district: District;
  province: Province;
}

/* =======================
   Dataset Container Types
   ======================= */

export interface Dataset {
  provinces: Province[];
  districts: District[];
  divisionalSecretariats: DivisionalSecretariat[];
  gramaNiladhariDivisions: GramaNiladhariDivision[];
  villages: Village[];
  postalCodes?: PostalCode[];
}

/* =======================
   Index Types (for fast lookup)
   ======================= */

export interface DatasetIndexes {
  provinceById: Map<string, Province>;
  districtById: Map<string, District>;
  dsById: Map<string, DivisionalSecretariat>;
  gnById: Map<string, GramaNiladhariDivision>;
  villageById: Map<string, Village>;

  districtsByProvince: Map<string, District[]>;
  dsByDistrict: Map<string, DivisionalSecretariat[]>;
  gnByDS: Map<string, GramaNiladhariDivision[]>;
  villagesByGN: Map<string, Village[]>;
}
