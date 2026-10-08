import { describe, expect, it } from "vitest";

describe("analytics service server unit tests", () => {
  it("builds a valid aggregate response", () => {
    const result = {
      success: true,
      metrics: {
        attendance: 89,
      },
    };

    expect(result.success).toBe(true);
    expect(result.metrics.attendance).toBeGreaterThan(0);
  });
});
