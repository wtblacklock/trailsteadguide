export function parsePartySize(params: { adults?: string; kids?: string }): { adults: number; kids: number } {
  const a = Number.parseInt(params.adults ?? '', 10)
  const k = Number.parseInt(params.kids ?? '', 10)
  return {
    adults: Number.isFinite(a) && a >= 1 ? Math.min(a, 12) : 2,
    kids: Number.isFinite(k) && k >= 0 ? Math.min(k, 12) : 2,
  }
}
