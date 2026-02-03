import {
  DivisionalSecretariat,
  DivisionalSecretariatNode,
  GramaNiladhariDivision,
  GramaNiladhariNode,
  Dataset,
  DatasetIndexes,
} from "../types/models";

/* ============================================================
   Divisional Secretariat Accessors
   ============================================================ */

/**
 * Get all Divisional Secretariats
 */
export function getDivisionalSecretariats(
  dataset: Dataset
): DivisionalSecretariat[] {
  return dataset.divisionalSecretariats;
}

/**
 * Get Divisional Secretariat by ID
 */
export function getDivisionalSecretariatById(
  id: string,
  indexes: DatasetIndexes
): DivisionalSecretariat | undefined {
  return indexes.dsById.get(id);
}

/**
 * Get Divisional Secretariat by name (case-insensitive)
 */
export function getDivisionalSecretariatByName(
  name: string,
  dataset: Dataset
): DivisionalSecretariat | undefined {
  const target = name.trim().toLowerCase();

  return dataset.divisionalSecretariats.find(
    (ds) => ds.name.toLowerCase() === target
  );
}

/**
 * Get Divisional Secretariats by District ID
 */
export function getDivisionalSecretariatsByDistrict(
  districtId: string,
  indexes: DatasetIndexes
): DivisionalSecretariat[] {
  return indexes.dsByDistrict.get(districtId) ?? [];
}

/**
 * Build a DivisionalSecretariatNode (DS → GN)
 * NOTE: Villages are not expanded here
 */
export function buildDivisionalSecretariatNode(
  dsId: string,
  indexes: DatasetIndexes
): DivisionalSecretariatNode | undefined {
  const ds = indexes.dsById.get(dsId);
  if (!ds) return undefined;

  const gramaNiladhariDivisions =
    indexes.gnByDS
      .get(dsId)
      ?.map<GramaNiladhariNode>((gn) => ({
        ...gn,
        villages: [],
      })) ?? [];

  return {
    ...ds,
    gramaNiladhariDivisions,
  };
}

/**
 * Build all DivisionalSecretariatNodes for a District
 */
export function buildDivisionalSecretariatNodesByDistrict(
  districtId: string,
  indexes: DatasetIndexes
): DivisionalSecretariatNode[] {
  return (
    indexes.dsByDistrict
      .get(districtId)
      ?.map<DivisionalSecretariatNode>((ds) => ({
        ...ds,
        gramaNiladhariDivisions:
          indexes.gnByDS
            .get(ds.id)
            ?.map<GramaNiladhariNode>((gn) => ({
              ...gn,
              villages: [],
            })) ?? [],
      })) ?? []
  );
}

/**
 * Assert Divisional Secretariat exists (throws error)
 */
export function assertDivisionalSecretariatExists(
  dsId: string,
  indexes: DatasetIndexes
): DivisionalSecretariat {
  const ds = indexes.dsById.get(dsId);

  if (!ds) {
    throw new Error(`Divisional Secretariat not found: ${dsId}`);
  }

  return ds;
}
