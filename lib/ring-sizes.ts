/** Brazilian ring sizes for checkout (BR), 7–26 in steps of 0.5 */

export const RING_SIZE_MIN = 7
export const RING_SIZE_MAX = 26
export const RING_SIZE_STEP = 0.5

export function getRingSizeOptions(): number[] {
  const out: number[] = []
  for (let i = RING_SIZE_MIN * 2; i <= RING_SIZE_MAX * 2; i++) {
    out.push(i / 2)
  }
  return out
}

export function formatRingSizeLabel(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n).replace('.', ',')
}

export function isValidRingSizeString(value: string): boolean {
  const n = parseFloat(value.replace(',', '.'))
  if (!Number.isFinite(n)) return false
  if (n < RING_SIZE_MIN || n > RING_SIZE_MAX) return false
  const steps = (n - RING_SIZE_MIN) / RING_SIZE_STEP
  return Number.isInteger(steps)
}
