import {
  Province,
  ProvinceNode,
  District,
  DistrictNode,
  Dataset,
  DatasetIndexes,
} from "../types/models";

/* ============================================================
   Province Accessors
   ============================================================ */

/**
 * Get all provinces
 */
export function getProvinces(dataset: Dataset): Province[] {
  return dataset.provinces;
}

/**
 * Get province by ID
 */
export function getProvinceById(
  id: string,
  indexes: DatasetIndexes
): Province | undefined {
  return indexes.provinceById.get(id);
}

/**
 * Get province by name (case-insensitive)
 */
export function getProvinceByName(
  name: string,
  dataset: Dataset
): Province | undefined {
  const target = name.trim().toLowerCase();

  return dataset.provinces.find(
    (p) => p.name.toLowerCase() === target
  );
}

/**
 * Build a ProvinceNode (Province → Districts → DS → GN → Villages)
 * NOTE: This only builds the Province + District layer
 * Deeper layers should be composed in district access
 */
export function buildProvinceNode(
  provinceId: string,
  indexes: DatasetIndexes
): ProvinceNode | undefined {
  const province = indexes.provinceById.get(provinceId);
  if (!province) return undefined;

  const districts = indexes.districtsByProvince
    .get(provinceId)
    ?.map<DistrictNode>((district) => ({
      ...district,
      divisionalSecretariats: [],
    })) ?? [];

  return {
    ...province,
    districts,
  };
}

/**
 * Build all ProvinceNodes (top-level hierarchy)
 */
export function buildAllProvinceNodes(
  indexes: DatasetIndexes
): ProvinceNode[] {
  return Array.from(indexes.provinceById.values()).map(
    (province) => ({
      ...province,
      districts:
        indexes.districtsByProvince
          .get(province.id)
          ?.map<DistrictNode>((district) => ({
            ...district,
            divisionalSecretariats: [],
          })) ?? [],
    })
  );
}

/**
 * Assert province exists (throws error)
 */
export function assertProvinceExists(
  provinceId: string,
  indexes: DatasetIndexes
): Province {
  const province = indexes.provinceById.get(provinceId);

  if (!province) {
    throw new Error(`Province not found: ${provinceId}`);
  }

  return province;
}
