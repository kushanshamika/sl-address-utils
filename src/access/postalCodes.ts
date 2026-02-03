import {
  PostalCode,
  Dataset,
  DatasetIndexes,
  District,
  Province,
} from "../types/models";

/* ============================================================
   Postal Code Accessors
   ============================================================ */

/**
 * Get all postal codes
 */
export function getPostalCodes(dataset: Dataset): PostalCode[] {
  return dataset.postalCodes ?? [];
}

/**
 * Get postal code by code value
 */
export function getPostalCodeByCode(
  code: string,
  dataset: Dataset
): PostalCode | undefined {
  return dataset.postalCodes?.find(
    (p) => p.code === code
  );
}

/**
 * Get postal codes by district ID
 */
export function getPostalCodesByDistrict(
  districtId: string,
  dataset: Dataset
): PostalCode[] {
  return (
    dataset.postalCodes?.filter(
      (p) => p.districtId === districtId
    ) ?? []
  );
}

/**
 * Resolve District for a postal code
 */
export function getDistrictByPostalCode(
  code: string,
  indexes: DatasetIndexes,
  dataset: Dataset
): District | undefined {
  const postal = getPostalCodeByCode(code, dataset);
  if (!postal?.districtId) return undefined;

  return indexes.districtById.get(postal.districtId);
}

/**
 * Resolve Province for a postal code
 */
export function getProvinceByPostalCode(
  code: string,
  indexes: DatasetIndexes,
  dataset: Dataset
): Province | undefined {
  const district = getDistrictByPostalCode(
    code,
    indexes,
    dataset
  );
  if (!district) return undefined;

  return indexes.provinceById.get(district.provinceId);
}

/**
 * Assert postal code exists (throws error)
 */
export function assertPostalCodeExists(
  code: string,
  dataset: Dataset
): PostalCode {
  const postal = getPostalCodeByCode(code, dataset);

  if (!postal) {
    throw new Error(`Postal code not found: ${code}`);
  }

  return postal;
}
