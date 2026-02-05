import {
  Village,
  Dataset,
  DatasetIndexes,
  AddressPath,
} from "../types/models";
import { dsByDistrictId } from "../indexes/buildIndexes";
import { gnByDivisionalSecretariatId } from "../indexes/buildIndexes";
import { villagesByGramaNiladhariId } from "../indexes/buildIndexes";

/* ============================================================
   Village Accessors
   ============================================================ */

/**
 * Get all villages
 */
export function getVillages(dataset: Dataset): Village[] {
  return dataset.villages;
}

/**
 * Get village by ID
 */
export function getVillageById(
  id: string,
  indexes: DatasetIndexes
): Village | undefined {
  return indexes.villageById.get(id);
}

/**
 * Get village by name (case-insensitive)
 * NOTE: Village names are not guaranteed unique
 */
export function getVillagesByName(
  name: string,
  dataset: Dataset
): Village[] {
  const target = name.trim().toLowerCase();

  return dataset.villages.filter(
    (v) => v.name.toLowerCase() === target
  );
}

/**
 * Get villages by Grama Niladhari Division ID
 */
export function getVillagesByGN(
  gnId: string,
  indexes: DatasetIndexes
): Village[] {
  return indexes.villagesByGN.get(gnId) ?? [];
}

/**
 * Get all villages under a given district
 */
export function getVillagesByDistrict(districtId: string): Village[] {
  const dsIds = dsByDistrictId.get(districtId);
  if (!dsIds) return [];

  const result: Village[] = [];

  for (const dsId of dsIds) {
    const gnIds = gnByDivisionalSecretariatId.get(dsId);
    if (!gnIds) continue;

    for (const gnId of gnIds) {
      const villagesForGN = villagesByGramaNiladhariId.get(gnId);
      if (villagesForGN) {
        result.push(...villagesForGN);
      }
    }
  }

  return result;
}

/**
 * Resolve full administrative path for a village
 * Province → District → DS → GN → Village
 */
export function getVillagePath(
  villageId: string,
  indexes: DatasetIndexes
): AddressPath | undefined {
  const village = indexes.villageById.get(villageId);
  if (!village) return undefined;

  const gn = indexes.gnById.get(village.gramaNiladhariDivisionId);
  if (!gn) return undefined;

  const ds = indexes.dsById.get(gn.divisionalSecretariatId);
  if (!ds) return undefined;

  const district = indexes.districtById.get(ds.districtId);
  if (!district) return undefined;

  const province = indexes.provinceById.get(district.provinceId);
  if (!province) return undefined;

  return {
    province,
    district,
    divisionalSecretariat: ds,
    gramaNiladhariDivision: gn,
    village,
  };
}

/**
 * Assert village exists (throws error)
 */
export function assertVillageExists(
  villageId: string,
  indexes: DatasetIndexes
): Village {
  const village = indexes.villageById.get(villageId);

  if (!village) {
    throw new Error(`Village not found: ${villageId}`);
  }

  return village;
}
