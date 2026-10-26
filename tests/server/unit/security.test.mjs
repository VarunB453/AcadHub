import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../server/database/mongodb.mjs", () => ({
  getDb: vi.fn(),
}));

vi.mock("../../../server/middleware/authMiddleware.mjs", () => ({
  getAuthUser: vi.fn(),
}));

import { getDb } from "../../../server/database/mongodb.mjs";
import { getAuthUser } from "../../../server/middleware/authMiddleware.mjs";
import { handleAuth } from "../../../server/routes/auth.mjs";
import { handleAI } from "../../../server/routes/ai.mjs";
import { hasPermission } from "../../../server/utils/permissions.mjs";
import { signToken, verifyToken } from "../../../server/utils/auth.mjs";
import { resolveUploadPath } from "../../../server/utils/uploadPaths.mjs";
import { filtersFromSearch, sortFromSearch } from "../../../server/utils/helpers.mjs";
import { getPendingRequests } from "../../../server/services/approvalService.mjs";
import { send } from "../../../server/utils/response.mjs";
import { AUTH_SECRET } from "../../../server/config/env.mjs";
import { createHmac } from "node:crypto";

function responseDouble() {
  return {
    headers: null,
    status: null,
    body: null,
    writeHead(status, headers) {
      this.status = status;
      this.headers = headers;
    },
    end(body) {
      this.body = body;
    },
  };
}

describe("security regression checks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects malformed and expired tokens without throwing", () => {
    const payload = Buffer.from(JSON.stringify({ sub: "", exp: 1 })).toString("base64url");
    const signature = createHmac("sha256", AUTH_SECRET).update(payload).digest("base64url");

    expect(verifyToken("not-a-token")).toBeNull();
    expect(verifyToken(`${payload}.${signature}`)).toBeNull();
    expect(verifyToken(signToken({ id: "user-1", email: "user@example.test" }))?.sub).toBe("user-1");
  });

  it("keeps upload paths inside the upload directory", () => {
    expect(resolveUploadPath("/uploads/123e4567-e89b-12d3-a456-426614174000.pdf", "/tmp/uploads"))
      .toBe("/tmp/uploads/123e4567-e89b-12d3-a456-426614174000.pdf");
    expect(resolveUploadPath("/uploads/../../.env", "/tmp/uploads")).toBeNull();
    expect(resolveUploadPath("/uploads/%2e%2e/%2e%2e/.env", "/tmp/uploads")).toBeNull();
  });

  it("normalizes a trailing slash from the configured CORS origin", () => {
    const originalClientOrigin = process.env.CLIENT_ORIGIN;
    const originalNodeEnv = process.env.NODE_ENV;
    delete process.env.CLIENT_ORIGIN;
    process.env.NODE_ENV = "production";

    try {
      const res = responseDouble();
      send(res, 204);

      expect(res.headers["Access-Control-Allow-Origin"])
        .toBe("https://acad-hub-eight.vercel.app");

      process.env.CLIENT_ORIGIN = "https://acad-hub-eight.vercel.app/";
      const configuredRes = responseDouble();
      send(configuredRes, 204);

      expect(configuredRes.headers["Access-Control-Allow-Origin"])
        .toBe("https://acad-hub-eight.vercel.app");
    } finally {
      if (originalClientOrigin === undefined) {
        delete process.env.CLIENT_ORIGIN;
      } else {
        process.env.CLIENT_ORIGIN = originalClientOrigin;
      }
      if (originalNodeEnv === undefined) {
        delete process.env.NODE_ENV;
      } else {
        process.env.NODE_ENV = originalNodeEnv;
      }
    }
  });

  it("restricts user-record access and modification to admins", () => {
    expect(hasPermission({ roles: ["faculty"] }, "users", "read")).toBe(false);
    expect(hasPermission({ roles: ["faculty"] }, "users", "update")).toBe(false);
    expect(hasPermission({ roles: ["admin"] }, "users", "read")).toBe(true);
  });

  it("does not return stored password hashes with pending approvals", async () => {
    const pending = [{ id: "request-1", password_hash: "redacted-hash", status: "pending" }];
    getDb.mockResolvedValue({
      collection: () => ({
        find: () => ({ toArray: async () => pending }),
      }),
    });

    const result = await getPendingRequests();

    expect(result).toEqual([{ id: "request-1", status: "pending" }]);
    expect(result[0]).not.toHaveProperty("password_hash");
  });

  it("ignores operator-shaped query and sort fields", () => {
    const filters = filtersFromSearch(new URLSearchParams("filter_%24where=1"));
    const sort = sortFromSearch(new URLSearchParams("sort=$natural:asc"));

    expect(filters).toEqual({});
    expect(sort).toEqual({});
  });

  it("does not allow password reset using only an email address", async () => {
    const users = { updateOne: vi.fn() };
    getDb.mockResolvedValue({ collection: () => users });
    const res = responseDouble();

    await handleAuth(
      {
        method: "POST",
        headers: {},
        async *[Symbol.asyncIterator]() {
          yield Buffer.from(JSON.stringify({ email: "user@example.test", password: "new-password" }));
        },
      },
      res,
      ["api", "auth", "forgot-password"]
    );

    expect(res.status).toBe(410);
    expect(users.updateOne).not.toHaveBeenCalled();
  });

  it("requires authentication for AI requests", async () => {
    getAuthUser.mockResolvedValue(null);
    const res = responseDouble();

    await handleAI({ method: "POST", headers: {} }, res);

    expect(res.status).toBe(401);
    expect(JSON.parse(res.body).error).toBe("Authentication required.");
  });
});