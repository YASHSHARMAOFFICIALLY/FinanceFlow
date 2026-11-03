import type { NextRequest } from "next/server";
import { middleware } from "./middleware";
import { getSessionCookie } from "better-auth/cookies";

jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(() => ({
      status: 200,
      headers: new Map(),
    })),
    redirect: jest.fn((url: URL | string, status = 307) => {
      const headers = new Map();
      headers.set("location", url.toString());
      return {
        status,
        headers: {
          get: (key: string) => headers.get(key.toLowerCase()) || null,
        },
      };
    }),
  },
}));

jest.mock("better-auth/cookies", () => ({
  getSessionCookie: jest.fn(),
}));

function createMockRequest(urlStr: string): NextRequest {
  const parsed = new URL(urlStr);
  return {
    url: urlStr,
    nextUrl: {
      pathname: parsed.pathname,
      search: parsed.search,
    },
    headers: new Headers(),
  } as unknown as NextRequest;
}

describe("Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("/Quiz redirect", () => {
    it("redirects /Quiz permanently to /quiz with status 308", async () => {
      const request = createMockRequest("http://localhost:3000/Quiz");
      const response = await middleware(request);

      expect(response.status).toBe(308);
      expect(response.headers.get("location")).toBe("http://localhost:3000/quiz");
    });

    it("preserves query parameters when redirecting /Quiz to /quiz", async () => {
      const request = createMockRequest("http://localhost:3000/Quiz?ref=dashboard&theme=dark");
      const response = await middleware(request);

      expect(response.status).toBe(308);
      expect(response.headers.get("location")).toBe("http://localhost:3000/quiz?ref=dashboard&theme=dark");
    });
  });

  describe("/quiz route protection and redirect loop prevention", () => {
    it("redirects unauthenticated /quiz requests to /signin with next=/quiz", async () => {
      (getSessionCookie as jest.Mock).mockReturnValue(undefined);

      const request = createMockRequest("http://localhost:3000/quiz");
      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/signin?next=%2Fquiz");
    });

    it("preserves query parameters when redirecting unauthenticated /quiz requests", async () => {
      (getSessionCookie as jest.Mock).mockReturnValue(undefined);

      const request = createMockRequest("http://localhost:3000/quiz?topic=tax");
      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/signin?next=%2Fquiz%3Ftopic%3Dtax");
    });

    it("allows authenticated /quiz requests without redirect loops", async () => {
      (getSessionCookie as jest.Mock).mockReturnValue("valid-session-token");

      const request = createMockRequest("http://localhost:3000/quiz");
      const response = await middleware(request);

      // Status 200 means NextResponse.next() is returned (no redirect)
      expect(response.status).toBe(200);
    });
  });

  describe("Other routes", () => {
    it("never intercepts auth API routes", async () => {
      const request = createMockRequest("http://localhost:3000/api/auth/session");
      const response = await middleware(request);

      expect(response.status).toBe(200);
    });

    it("allows access to public routes", async () => {
      const request = createMockRequest("http://localhost:3000/");
      const response = await middleware(request);

      expect(response.status).toBe(200);
    });
  });
});
