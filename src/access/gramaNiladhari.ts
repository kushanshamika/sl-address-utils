import {
  GramaNiladhariDivision,
  GramaNiladhariNode,
  Village,
  VillageNode,
  Dataset,
  DatasetIndexes,
} from "../types/models";

/* ============================================================
   Grama Niladhari Division Accessors
   ============================================================ */

/**
 * Get all Grama Niladhari Divisions
 */
export function getGramaNiladhariDivisions(
  dataset: Dataset
): GramaNiladhariDivision[] {
  return dataset.gramaNiladhariDivisions;
}

/**
 * Get Grama Niladhari Division by ID
 */
export function getGramaNiladhariDivisionById(
  id: string,
  indexes: DatasetIndexes
): GramaNiladhariDivision | undefined {
  return indexes.gnById.get(id);
}

/**
 * Get Grama Niladhari Division by name (case-insensitive)
 */
export function getGramaNiladhariDivisionByName(
  name: string,
  dataset: Dataset
): GramaNiladhariDivision | undefined {
  const target = name.trim().toLowerCase();

  return dataset.gramaNiladhariDivisions.find(
    (gn) => gn.name.toLowerCase() === target
  );
}

/**
 * Get GN divisions by Divisional Secretariat ID
 */
export function getGramaNiladhariDivisionsByDS(
  dsId: string,
  indexes: DatasetIndexes
): GramaNiladhariDivision[] {
  return indexes.gnByDS.get(dsId) ?? [];
}

/**
 * Get villages by Grama Niladhari Division ID
 */
export function getVillagesByGramaNiladhari(
  gnId: string,
  indexes: DatasetIndexes
): Village[] {
  return indexes.villagesByGN.get(gnId) ?? [];
}

/**
 * Build a GramaNiladhariNode (GN → Villages)
 */
export function buildGramaNiladhariNode(
  gnId: string,
  indexes: DatasetIndexes
): GramaNiladhariNode | undefined {
  const gn = indexes.gnById.get(gnId);
  if (!gn) return undefined;

  const villages =
    indexes.villagesByGN
      .get(gnId)
      ?.map<VillageNode>((v) => ({ ...v })) ?? [];

  return {
    ...gn,
    villages,
  };
}

/**
 * Build all GN nodes for a Divisional Secretariat
 */
export function buildGramaNiladhariNodesByDS(
  dsId: string,
  indexes: DatasetIndexes
): GramaNiladhariNode[] {
  return (
    indexes.gnByDS
      .get(dsId)
      ?.map<GramaNiladhariNode>((gn) => ({
        ...gn,
        villages:
          indexes.villagesByGN
            .get(gn.id)
            ?.map<VillageNode>((v) => ({ ...v })) ?? [],
      })) ?? []
  );
}

/**
 * Assert GN division exists (throws error)
 */
export function assertGramaNiladhariExists(
  gnId: string,
  indexes: DatasetIndexes
): GramaNiladhariDivision {
  const gn = indexes.gnById.get(gnId);

  if (!gn) {
    throw new Error(`Grama Niladhari Division not found: ${gnId}`);
  }

  return gn;
}
