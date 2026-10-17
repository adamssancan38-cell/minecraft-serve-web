export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { desc } from "drizzle-orm";
import nodemailer from "nodemailer";

const esc = (v: string) =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function GET() {
  try {
    const allComments = await db
      .select()
      .from(comments)
      .orderBy(desc(comments.createdAt))
      .limit(50);
    return NextResponse.json(allComments);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener comentarios" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, correo y mensaje son requeridos" },
        { status: 400 }
      );
    }

    // Guardar en la base de datos
    const [newComment] = await db
      .insert(comments)
      .values({ name, email, message })
      .returning();

    // Enviar correo electrónico (Resend primero; SMTP como respaldo)
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const resendKey = process.env.RESEND_API_KEY;
      const subject = "Comentario de los usuarios";
      const html = `
        <div style="font-family: 'Courier New', monospace; background: #2d2d2d; color: #fff; padding: 20px; border: 3px solid #4CAF50;">
          <h2 style="color: #4CAF50;">⛏ Comentario de los usuarios</h2>
          <p><strong>Nombre:</strong> ${esc(name)}</p>
          <p><strong>Correo:</strong> ${esc(email)}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #1a1a1a; padding: 10px; border: 1px solid #555;">${esc(message)}</p>
          <hr style="border-color: #4CAF50;" />
          <p style="font-size: 12px; color: #888;">Enviado desde Server de Minecraft para los Papupanas</p>
        </div>
      `;

      if (resendKey && adminEmail) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "Papupanas <onboarding@resend.dev>",
            to: [adminEmail],
            reply_to: String(email),
            subject,
            html,
          }),
        });
        if (!res.ok) {
          console.error("Error de Resend:", res.status, await res.text());
        }
      } else {
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (smtpHost && smtpPort && smtpUser && smtpPass && adminEmail) {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(smtpPort),
            secure: Number(smtpPort) === 465,
            auth: { user: smtpUser, pass: smtpPass },
          });
          await transporter.sendMail({
            from: `"Server de Minecraft para los Papupanas" <${smtpUser}>`,
            to: adminEmail,
            subject,
            html,
          });
        }
      }
    } catch (emailError) {
      console.error("Error al enviar correo:", emailError);
      // No fallar la petición si el correo falla
    }

    return NextResponse.json(newComment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear comentario" },
      { status: 500 }
    );
  }
}
