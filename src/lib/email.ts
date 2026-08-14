import { Resend } from "resend";

export const emailSendingEnabled = Boolean(process.env.RESEND_API_KEY);

let client: Resend | null = null;
function getClient(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

interface NotifyArgs {
  to: string[];
  subject: string;
  postTitle: string;
  postExcerpt: string;
  postUrl: string;
}

/** No-ops (returns { skipped: true }) unless RESEND_API_KEY is configured. */
export async function sendPostNotification({
  to,
  subject,
  postTitle,
  postExcerpt,
  postUrl,
}: NotifyArgs): Promise<{ skipped: true } | { skipped: false; sent: number }> {
  if (!emailSendingEnabled || to.length === 0) {
    return { skipped: true };
  }

  const from = process.env.RESEND_FROM_EMAIL || "Powering House <hello@example.com>";
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="margin:0 0 12px;">${postTitle}</h2>
      <p style="color:#555;line-height:1.6;">${postExcerpt}</p>
      <p><a href="${postUrl}" style="color:#C97C0B;">Read the full post &rarr;</a></p>
    </div>
  `;

  // BCC recipients in batches so subscribers never see each other's addresses.
  const BATCH_SIZE = 45;
  const batches: string[][] = [];
  for (let i = 0; i < to.length; i += BATCH_SIZE) batches.push(to.slice(i, i + BATCH_SIZE));

  for (const batch of batches) {
    await getClient().emails.send({
      from,
      to: from,
      bcc: batch,
      subject,
      html,
    });
  }

  return { skipped: false, sent: to.length };
}
