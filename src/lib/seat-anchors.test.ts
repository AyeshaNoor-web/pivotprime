import { describe, expect, it } from "vitest";
import { SEAT_IDS, resolveSeatFromHash, seatIndexFromHash } from "./seat-anchors";

describe("seat anchors", () => {
  it("resolves each canonical fragment to its own seat", () => {
    expect(resolveSeatFromHash("#coo")).toBe("coo");
    expect(resolveSeatFromHash("#chief-of-staff")).toBe("chief-of-staff");
    expect(resolveSeatFromHash("#cfo")).toBe("cfo");
  });

  it("aliases #cos to #chief-of-staff", () => {
    // Spec 4.2 instructs #chief-of-staff, then labels the same seat #cos eleven
    // lines later. Any link written from either reading has to land.
    expect(resolveSeatFromHash("#cos")).toBe("chief-of-staff");
    expect(seatIndexFromHash("#cos")).toBe(seatIndexFromHash("#chief-of-staff"));
  });

  it("is case insensitive and tolerates a missing hash character", () => {
    expect(resolveSeatFromHash("#COO")).toBe("coo");
    expect(resolveSeatFromHash("cfo")).toBe("cfo");
  });

  it("returns null rather than guessing for an unknown fragment", () => {
    expect(resolveSeatFromHash("#team")).toBeNull();
    expect(resolveSeatFromHash("#")).toBeNull();
    expect(resolveSeatFromHash("")).toBeNull();
  });

  it("survives a malformed percent-encoded fragment", () => {
    expect(resolveSeatFromHash("#%E0%A4%A")).toBeNull();
  });

  it("falls back to the first seat when the fragment means nothing", () => {
    expect(seatIndexFromHash("")).toBe(0);
    expect(seatIndexFromHash("#nonsense")).toBe(0);
  });

  it("keeps the seat order stable, since indexes drive the UI", () => {
    expect([...SEAT_IDS]).toEqual(["coo", "chief-of-staff", "cfo"]);
  });
});
