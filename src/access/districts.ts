import {
  District,
  DistrictNode,
  DivisionalSecretariat,
  DivisionalSecretariatNode,
  Dataset,
  DatasetIndexes,
} from "../types/models";

/* ============================================================
   District Accessors
   ============================================================ */

/**
 * Get all districts
 */
export function getDistricts(dataset: Dataset): District[] {
  return dataset.districts;
}

/**
 * Get district by ID
 */
export function getDistrictById(
  id: string,
  indexes: DatasetIndexes
): District | undefined {
  return indexes.districtById.get(id);
}

/**
 * Get district by name (case-insensitive)
 */
export function getDistrictByName(
  name: string,
  dataset: Dataset
): District | undefined {
  const target = name.trim().toLowerCase();

  return dataset.districts.find(
    (d) => d.name.toLowerCase() === target
  );
}

/**
 * Get districts by province ID
 */
export function getDistrictsByProvince(
  provinceId: string,
  indexes: DatasetIndexes
): District[] {
  return indexes.districtsByProvince.get(provinceId) ?? [];
}

/**
 * Build a DistrictNode (District → Divisional Secretariats)
 * NOTE: GN & Village layers are intentionally excluded
 */
export function buildDistrictNode(
  districtId: string,
  indexes: DatasetIndexes
): DistrictNode | undefined {
  const district = indexes.districtById.get(districtId);
  if (!district) return undefined;

  const divisionalSecretariats =
    indexes.dsByDistrict
      .get(districtId)
      ?.map<DivisionalSecretariatNode>((ds) => ({
        ...ds,
        gramaNiladhariDivisions: [],
      })) ?? [];

  return {
    ...district,
    divisionalSecretariats,
  };
}

/**
 * Build all DistrictNodes for a province
 */
export function buildDistrictNodesByProvince(
  provinceId: string,
  indexes: DatasetIndexes
): DistrictNode[] {
  return (
    indexes.districtsByProvince
      .get(provinceId)
      ?.map<DistrictNode>((district) => ({
        ...district,
        divisionalSecretariats:
          indexes.dsByDistrict
            .get(district.id)
            ?.map<DivisionalSecretariatNode>((ds) => ({
              ...ds,
              gramaNiladhariDivisions: [],
            })) ?? [],
      })) ?? []
  );
}

/**
 * Assert district exists (throws error)
 */
export function assertDistrictExists(
  districtId: string,
  indexes: DatasetIndexes
): District {
  const district = indexes.districtById.get(districtId);

  if (!district) {
    throw new Error(`District not found: ${districtId}`);
  }

  return district;
}
