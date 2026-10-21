export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Devuelve la imagen/GIF de un comentario como archivo normal.
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return new NextResponse("No encontrado", { status: 404 });

  try {
    const [row] = await db
      .select({ image: comments.image })
      .from(comments)
      .where(eq(comments.id, id))
      .limit(1);

    const m = row?.image?.match(/^data:(image\/(?:png|jpeg|gif|webp));base64,(.+)$/);
    if (!m) return new NextResponse("No encontrado", { status: 404 });

    return new NextResponse(Buffer.from(m[2], "base64"), {
      headers: {
        "Content-Type": m[1],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Error", { status: 500 });
  }
}
