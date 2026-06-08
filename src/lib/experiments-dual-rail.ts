/**
 * Scalable dual-rail layout engine — length-agnostic; works for any card collection size.
 */

export interface DualRailSplit<T> {
  leftRail: T[];
  rightRail: T[];
}

/** Distribute any card stream into balanced left/right vertical flex rails by index parity. */
export function splitIntoDualRails<T>(cards: readonly T[]): DualRailSplit<T> {
  const leftRail: T[] = [];
  const rightRail: T[] = [];

  for (let idx = 0; idx < cards.length; idx += 1) {
    if (idx % 2 === 0) {
      leftRail.push(cards[idx]!);
    } else {
      rightRail.push(cards[idx]!);
    }
  }

  return { leftRail, rightRail };
}
