import { buildPortfolio, serializePortfolio } from "@/content/portfolio";

export const dynamic = "force-static";

export async function GET() {
  return new Response(serializePortfolio(await buildPortfolio()), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
