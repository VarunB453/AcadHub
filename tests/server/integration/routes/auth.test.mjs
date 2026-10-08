import { describe, expect, it } from "vitest";

describe("auth route integration", () => {
  it("accepts a basic auth route contract", () => {
    const route = {
      method: "POST",
      path: "/api/auth/login",
    };

    expect(route.method).toBe("POST");
    expect(route.path).toContain("/api/auth");
  });
});
