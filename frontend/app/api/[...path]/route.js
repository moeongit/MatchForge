export const dynamic = "force-dynamic";

const API_BASE = process.env.MATCHFORGE_API_BASE || "http://localhost:8080";

async function forward(request, context) {
  const params = await context.params;
  const path = (params.path || []).join("/");
  const target = new URL(`${API_BASE}/${path}`);
  target.search = new URL(request.url).search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init = {
    method: request.method,
    headers
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  let response;
  try {
    response = await fetch(target, {
      ...init,
      cache: "no-store",
      signal: controller.signal
    });
  } catch {
    return Response.json(
      {
        error: "MatchForge API is unreachable. Start backend on http://localhost:8080."
      },
      { status: 503 }
    );
  } finally {
    clearTimeout(timeout);
  }
  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders
  });
}

export async function GET(request, context) {
  return forward(request, context);
}

export async function POST(request, context) {
  return forward(request, context);
}

export async function PUT(request, context) {
  return forward(request, context);
}

export async function DELETE(request, context) {
  return forward(request, context);
}
