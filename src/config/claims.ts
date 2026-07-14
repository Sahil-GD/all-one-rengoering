/**
 * CLAIMS REGISTRY — the honesty gate.
 *
 * Every marketing claim the site *could* make, and whether the business has
 * confirmed it. Anything not explicitly `true` is NEVER rendered: no trust
 * badge, no hero card, no FAQ answer. This makes it structurally impossible
 * to publish a claim nobody stands behind.
 *
 * To publish a claim: flip it to `true`. It appears everywhere it belongs,
 * in both languages, with no other change.
 *
 * `null` = not yet confirmed by the business (hidden).
 */
export type ClaimKey =
  | 'insured'
  | 'noBinding'
  | 'suppliesIncluded'
  | 'sameStaff'
  | 'ecoProducts'
  | 'satisfactionGuarantee';

export const claims: Record<ClaimKey, boolean | null> = {
  // [BEKRÆFT] Er medarbejdere og kundens inventar forsikringsdækket?
  insured: null,
  // [BEKRÆFT] Er der ingen bindingsperiode på faste aftaler?
  noBinding: null,
  // [BEKRÆFT] Medbringer I altid eget udstyr og rengøringsmidler?
  suppliesIncluded: null,
  // [BEKRÆFT] Sender I samme faste personale hver gang?
  sameStaff: null,
  // [BEKRÆFT] Bruger I miljøvenlige/skånsomme rengøringsmidler?
  ecoProducts: null,
  // [BEKRÆFT] Tilbyder I en tilfredshedsgaranti?
  satisfactionGuarantee: null,
};

/** Facts, not claims — verified from CVR and confirmed by the owner. */
export const verifiedFacts = {
  registeredCompany: true,
  freeQuotes: true,
  fixedPricing: true,
  serviceArea: true,
} as const;

export function isConfirmed(key: ClaimKey): boolean {
  return claims[key] === true;
}