import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const bodySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;
  if (!apiKey) {
    return Response.json(
      { error: "Missing RESEND_API_KEY in environment" },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.RESEND_TO;
  const fromEmail =
    process.env.RESEND_FROM || "Portfolio Contact <no-reply@yourdomain.com>";

  if (!toEmail) {
    return Response.json(
      {
        error:
          "Missing CONTACT_TO_EMAIL (or RESEND_TO) in environment to receive messages",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { firstName, lastName, email, subject, message } = parsed.data;

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">New portfolio contact</h2>
      <p style="margin: 0 0 8px;">
        <strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;
      </p>
      <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${subject}</p>
      <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <pre style="white-space: pre-wrap; margin: 0;">${message}</pre>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Portfolio] ${subject}`,
      reply_to: email,
      text: `${firstName} ${lastName} (${email})\n\n${message}`,
      html,
    });

    if (error) {
      throw error;
    }

    return Response.json({ ok: true });
  } catch (err) {
    const messageText =
      err instanceof Error ? err.message : "Unknown error sending email";
    return Response.json({ error: messageText }, { status: 500 });
  }
}


