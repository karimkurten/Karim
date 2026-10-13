/**
 * Jest tests for the cumulative professional experience calculator.
 * Run with: craco test / yarn test (watch mode) or CI=true yarn test
 */
import {
  parseMonthIndex,
  mergeIntervals,
  getTotalMonths,
  getCompletedYears,
  formatExperience,
} from "./experience";
import employmentHistory from "../data/employmentHistory.json";

const D = (s) => new Date(s + "T12:00:00Z");

describe("parseMonthIndex", () => {
  it("parses valid YYYY-MM", () => {
    expect(parseMonthIndex("2020-01")).toBe(2020 * 12 + 0);
    expect(parseMonthIndex("2020-12")).toBe(2020 * 12 + 11);
  });
  it("rejects invalid dates", () => {
    for (const bad of ["2020-13", "2020-00", "Jan 2020", "2020/01", "2020-1", "", null, 202001]) {
      expect(() => parseMonthIndex(bad)).toThrow(/Invalid YYYY-MM/);
    }
  });
});

describe("mergeIntervals", () => {
  it("does not double-count overlapping periods", () => {
    const recs = [
      { company: "A", startDate: "2020-01", endDate: "2021-06", isCurrent: false },
      { company: "B", startDate: "2021-01", endDate: "2022-01", isCurrent: false },
    ];
    expect(mergeIntervals(recs, D("2023-01"))).toEqual([[2020 * 12 + 0, 2022 * 12 + 0]]);
    expect(getTotalMonths(recs, D("2023-01"))).toBe(24);
  });

  it("does not double-count boundary-touching periods (end == next start)", () => {
    const recs = [
      { company: "A", startDate: "2018-12", endDate: "2022-03", isCurrent: false },
      { company: "B", startDate: "2022-03", endDate: "2023-06", isCurrent: false },
    ];
    expect(getTotalMonths(recs, D("2024-01"))).toBe(39 + 15);
  });

  it("excludes gaps", () => {
    const recs = [
      { company: "A", startDate: "2015-01", endDate: "2016-01", isCurrent: false },
      { company: "B", startDate: "2018-01", endDate: "2019-01", isCurrent: false },
    ];
    expect(getTotalMonths(recs, D("2024-01"))).toBe(24); // 12 + 12, gap ignored
  });

  it("handles unsorted input", () => {
    const recs = [
      { company: "B", startDate: "2018-01", endDate: "2019-01", isCurrent: false },
      { company: "A", startDate: "2015-01", endDate: "2016-01", isCurrent: false },
    ];
    expect(getTotalMonths(recs, D("2024-01"))).toBe(24);
  });
});

describe("ongoing vs ended employment", () => {
  it("uses the current date for ongoing roles and advances over time", () => {
    const recs = [{ company: "A", startDate: "2023-06", endDate: null, isCurrent: true }];
    expect(getTotalMonths(recs, D("2024-06"))).toBe(12);
    expect(getTotalMonths(recs, D("2026-10"))).toBe(40);
  });

  it("stops counting an ended role at its end date", () => {
    const recs = [{ company: "A", startDate: "2020-01", endDate: "2021-01", isCurrent: false }];
    expect(getTotalMonths(recs, D("2021-01"))).toBe(12);
    expect(getTotalMonths(recs, D("2030-01"))).toBe(12);
  });
});

describe("leap years", () => {
  it("month arithmetic is unaffected by leap days", () => {
    // Spans Feb 29, 2020 — still exactly 3 whole months
    const recs = [{ company: "A", startDate: "2020-01", endDate: "2020-04", isCurrent: false }];
    expect(getTotalMonths(recs, D("2021-01"))).toBe(3);
    // Feb alone in a leap year is still one month
    const feb = [{ company: "A", startDate: "2020-02", endDate: "2020-03", isCurrent: false }];
    expect(getTotalMonths(feb, D("2021-01"))).toBe(1);
  });
});

describe("record changes", () => {
  it("recalculates when employment dates change", () => {
    const before = [{ company: "A", startDate: "2020-01", endDate: "2022-01", isCurrent: false }];
    const after = [{ company: "A", startDate: "2020-01", endDate: "2023-01", isCurrent: false }];
    expect(getTotalMonths(before, D("2024-01"))).toBe(24);
    expect(getTotalMonths(after, D("2024-01"))).toBe(36);
  });

  it("supports adding a new role without rewriting logic", () => {
    const recs = [{ company: "A", startDate: "2020-01", endDate: "2021-01", isCurrent: false }];
    const before = getTotalMonths(recs, D("2024-01"));
    recs.push({ company: "B", startDate: "2022-06", endDate: null, isCurrent: true });
    expect(getTotalMonths(recs, D("2024-01")) - before).toBe(19); // Jun 2022 → Jan 2024
  });
});

describe("invalid records", () => {
  it("rejects end before start", () => {
    const recs = [{ company: "A", startDate: "2022-01", endDate: "2021-01", isCurrent: false }];
    expect(() => getTotalMonths(recs, D("2024-01"))).toThrow(/ends before it starts/);
  });
  it("rejects non-current records with no endDate", () => {
    const recs = [{ company: "A", startDate: "2022-01", endDate: null, isCurrent: false }];
    expect(() => getTotalMonths(recs, D("2024-01"))).toThrow(/no endDate/);
  });
  it("rejects malformed record objects", () => {
    expect(() => getTotalMonths([null], D("2024-01"))).toThrow(/must be an object/);
  });
});

describe("display helpers", () => {
  it("floors to completed years", () => {
    const recs = [{ company: "A", startDate: "2020-01", endDate: "2021-07", isCurrent: false }];
    expect(getCompletedYears(recs, D("2024-01"))).toBe(1); // 18 months → 1
    expect(formatExperience(recs, D("2024-01"))).toBe("1+");
  });
});

describe("verified employment history", () => {
  it("computes 22+ years as of Oct 2026 from the resume dates", () => {
    expect(employmentHistory.length).toBe(5);
    expect(getTotalMonths(employmentHistory, D("2026-10"))).toBe(268);
    expect(getCompletedYears(employmentHistory, D("2026-10"))).toBe(22);
    expect(formatExperience(employmentHistory, D("2026-10"))).toBe("22+");
  });
});
