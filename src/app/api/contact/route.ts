import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const serviceLabels: Record<string, string> = {
  website: "Website",
  webapp: "Webapp",
  mobile: "Mobile App",
  other: "Sonstiges",
};

const budgetLabels: Record<string, string> = {
  small: "Unter 2.000 EUR",
  medium: "2.000 - 10.000 EUR",
  large: "10.000 - 50.000 EUR",
  enterprise: "Über 50.000 EUR",
};

// Create IONOS SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ionos.de",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, company, phone, service, budget, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    // Format the submission date
    const submittedAt = new Intl.DateTimeFormat("de-DE", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/Berlin",
    }).format(new Date());

    // Create HTML email for Origin Labs
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f6f9fc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #2DD4E0 0%, #0055FF 100%); padding: 32px 40px; text-align: center;">
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
          Origin Labs
        </div>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 40px;">
        <h1 style="color: #1a1a2e; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
          Neue Projektanfrage
        </h1>
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 32px 0;">
          Eingegangen am ${submittedAt}
        </p>

        <!-- Contact Details -->
        <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="color: #1a1a2e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">
            Kontaktdaten
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">E-Mail</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0055FF; font-size: 14px; font-weight: 600; text-decoration: none;">${email}</a></td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Unternehmen</td>
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${company}</td>
            </tr>
            ` : ''}
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Telefon</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #0055FF; font-size: 14px; font-weight: 600; text-decoration: none;">${phone}</a></td>
            </tr>
            ` : ''}
          </table>
        </div>

        <!-- Project Details -->
        <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="color: #1a1a2e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">
            Projektdetails
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Leistung</td>
              <td style="padding: 8px 0;">
                <span style="background-color: #e0f7fa; color: #00838f; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 20px;">
                  ${serviceLabels[service] || service}
                </span>
              </td>
            </tr>
            ${budget ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Budget</td>
              <td style="padding: 8px 0;">
                <span style="background-color: #f3e8ff; color: #7c3aed; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 20px;">
                  ${budgetLabels[budget] || budget}
                </span>
              </td>
            </tr>
            ` : ''}
          </table>
        </div>

        <!-- Message -->
        <div style="margin-bottom: 32px;">
          <h2 style="color: #1a1a2e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">
            Nachricht
          </h2>
          <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; border-left: 4px solid #2DD4E0;">
            <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div style="text-align: center;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">
            Schnellaktionen
          </p>
          <a href="mailto:${email}" style="display: inline-block; background-color: #0055FF; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 0 8px;">
            Antworten
          </a>
          ${phone ? `
          <a href="tel:${phone}" style="display: inline-block; background-color: #ffffff; color: #0055FF; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; border: 2px solid #0055FF; margin: 0 8px;">
            Anrufen
          </a>
          ` : ''}
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0 0 4px 0;">
          Diese E-Mail wurde automatisch generiert.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          Origin Labs | Karl-Marx-Weg 20 | 06242 Krumpa
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Create confirmation email for customer
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f6f9fc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="background: linear-gradient(135deg, #2DD4E0 0%, #0055FF 100%); padding: 40px; text-align: center;">
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
          Origin Labs
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px;">
        <h1 style="color: #1a1a2e; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">
          Vielen Dank für Ihre Anfrage!
        </h1>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          Hallo ${name},
        </p>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          wir haben Ihre Projektanfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
        </p>
        <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; border-left: 4px solid #2DD4E0; margin: 24px 0;">
          <p style="color: #374151; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Ihre Nachricht:</p>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">"${message}"</p>
        </div>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
          Mit freundlichen Grüßen,<br>
          <strong style="color: #1a1a2e;">Ihr Origin Labs Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
          Origin Labs | Karl-Marx-Weg 20 | 06242 Krumpa
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          <a href="https://origin-labs.de" style="color: #0055FF; text-decoration: none;">www.origin-labs.de</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send email to Origin Labs
    await transporter.sendMail({
      from: `"Origin Labs Website" <${process.env.SMTP_USER}>`,
      to: "info@origin-labs.de",
      replyTo: email,
      subject: `Neue Projektanfrage von ${name}`,
      html: htmlContent,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Origin Labs" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Ihre Anfrage bei Origin Labs",
      html: confirmationHtml,
    });

    return NextResponse.json(
      { success: true, message: "E-Mail erfolgreich gesendet!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}
