/**
 * Cumulative professional experience calculator.
 *
 * Date-calculation method (documented so the number is auditable):
 * - Each employment record becomes a half-open month interval [startIdx, endIdx),
 *   where idx = year * 12 + (month - 1).
 * - "Current" roles use the current calendar month as the end (exclusive), so the
 *   count reflects completed months elapsed, and it advances automatically.
 * - Intervals are merged before summing: overlapping periods and periods that
 *   merely touch at a boundary month (e.g. one role ends Mar 2022 and the next
 *   starts Mar 2022) are counted exactly once. Gaps contribute nothing.
 * - Displayed years = floor(totalMonths / 12) — completed years only.
 *
 * The function is pure and testable: pass an explicit `asOf` date in tests.
 */

export function parseMonthIndex(ym) {
  if (typeof ym !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(ym)) {
    throw new Error(`Invalid YYYY-MM date: ${JSON.stringify(ym)}`);
  }
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function asOfMonthIndex(asOf) {
  const d = asOf instanceof Date ? asOf : new Date(asOf);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid asOf date");
  return d.getFullYear() * 12 + d.getMonth();
}

function toInterval(record, asOfIdx) {
  if (!record || typeof record !== "object") {
    throw new Error("Employment record must be an object");
  }
  const startIdx = parseMonthIndex(record.startDate);
  let endIdx;
  if (record.isCurrent) {
    endIdx = asOfIdx;
  } else {
    if (record.endDate == null) {
      throw new Error(
        `Record "${record.company || "?"}" is not current but has no endDate`
      );
    }
    endIdx = parseMonthIndex(record.endDate);
  }
  if (endIdx < startIdx) {
    throw new Error(
      `Record "${record.company || "?"}" ends before it starts (${record.startDate} → ${record.endDate || "present"})`
    );
  }
  return [startIdx, endIdx];
}

/** Merge overlapping or boundary-touching intervals; returns sorted merged list. */
export function mergeIntervals(records, asOf = new Date()) {
  const asOfIdx = asOfMonthIndex(asOf);
  const intervals = records.map((r) => toInterval(r, asOfIdx));
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [s, e] of intervals) {
    const last = merged[merged.length - 1];
    if (last && s <= last[1]) {
      last[1] = Math.max(last[1], e); // overlap or shared boundary month: count once
    } else {
      merged.push([s, e]);
    }
  }
  return merged;
}

/** Total cumulative experience in whole months. */
export function getTotalMonths(records, asOf = new Date()) {
  return mergeIntervals(records, asOf).reduce((sum, [s, e]) => sum + (e - s), 0);
}

/** Completed years of cumulative experience (what the site displays). */
export function getCompletedYears(records, asOf = new Date()) {
  return Math.floor(getTotalMonths(records, asOf) / 12);
}

/** Display string, e.g. "22+". */
export function formatExperience(records, asOf = new Date()) {
  return `${getCompletedYears(records, asOf)}+`;
}
