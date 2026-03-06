import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER || 'cttenptelbsccs2326@gmail.com';
const GMAIL_PASS = process.env.GMAIL_PASS || 'euymrjfjsqzgwcuj';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { to, subject, text, html, attachments } = req.body;

    try {
      await transporter.sendMail({
        from: `"CTTEWC NPTEL Coordinator" <${GMAIL_USER}>`,
        to,
        subject,
        text,
        html,
        attachments: attachments || []
      });
      console.log(`📧 Email sent successfully to ${to}`);
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Email error:", error);
      res.status(500).json({ error: error.message || "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}