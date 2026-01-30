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

    // Create HTML email for Origin Labs - Ultra Modern Design
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background: linear-gradient(180deg, #0a0a0f 0%, #13131a 100%); min-height: 100vh;">
  <!-- Outer Container with Glow Effect -->
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; margin: 0 auto;">
    <tr>
      <td>
        <!-- Main Card with Glass Effect -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(145deg, rgba(30,30,40,0.95) 0%, rgba(20,20,28,0.98) 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px rgba(45,212,224,0.1);">

          <!-- Header with Animated Gradient Effect -->
          <tr>
            <td style="position: relative; padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height: 6px; background: linear-gradient(90deg, #2DD4E0 0%, #0055FF 50%, #8B5CF6 100%);"></td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 48px 32px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 60px;">
                          <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #2DD4E0 0%, #0055FF 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <img src="https://origin-labs.de/logo.png" alt="Origin Labs" width="32" height="32" style="display: block;">
                          </div>
                        </td>
                        <td style="padding-left: 16px;">
                          <p style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.02em;">Origin Labs</p>
                          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 4px 0 0 0;">Neue Anfrage eingegangen</p>
                        </td>
                        <td style="text-align: right;">
                          <span style="display: inline-block; background: linear-gradient(135deg, rgba(45,212,224,0.15) 0%, rgba(0,85,255,0.15) 100%); border: 1px solid rgba(45,212,224,0.3); color: #2DD4E0; font-size: 11px; font-weight: 600; padding: 8px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em;">
                            ● Live
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Section -->
          <tr>
            <td style="padding: 0 48px 40px;">
              <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.03em; line-height: 1.2;">
                Projektanfrage
              </h1>
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">
                ${submittedAt}
              </p>
            </td>
          </tr>

          <!-- Contact Info Card -->
          <tr>
            <td style="padding: 0 48px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td style="padding: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">Kontakt</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 48px; vertical-align: top;">
                                <div style="width: 44px; height: 44px; background: linear-gradient(135deg, rgba(45,212,224,0.2) 0%, rgba(0,85,255,0.2) 100%); border-radius: 12px; text-align: center; line-height: 44px;">
                                  <span style="font-size: 20px;">👤</span>
                                </div>
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <p style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0;">${name}</p>
                                ${company ? `<p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 4px 0 0 0;">${company}</p>` : ''}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 16px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 12px 16px; background: rgba(0,85,255,0.08); border-radius: 10px; margin-bottom: 8px;">
                                <a href="mailto:${email}" style="color: #60a5fa; font-size: 14px; font-weight: 500; text-decoration: none;">✉️ ${email}</a>
                              </td>
                            </tr>
                            ${phone ? `
                            <tr>
                              <td style="padding: 12px 16px; background: rgba(45,212,224,0.08); border-radius: 10px; margin-top: 8px;">
                                <a href="tel:${phone}" style="color: #2DD4E0; font-size: 14px; font-weight: 500; text-decoration: none;">📱 ${phone}</a>
                              </td>
                            </tr>
                            ` : ''}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Details Cards -->
          <tr>
            <td style="padding: 0 48px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width: 50%; padding-right: 8px; vertical-align: top;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(145deg, rgba(45,212,224,0.1) 0%, rgba(45,212,224,0.05) 100%); border-radius: 16px; border: 1px solid rgba(45,212,224,0.2);">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">Leistung</p>
                          <p style="color: #2DD4E0; font-size: 16px; font-weight: 700; margin: 0;">${serviceLabels[service] || service}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="width: 50%; padding-left: 8px; vertical-align: top;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(145deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.05) 100%); border-radius: 16px; border: 1px solid rgba(139,92,246,0.2);">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">Budget</p>
                          <p style="color: #a78bfa; font-size: 16px; font-weight: 700; margin: 0;">${budget ? (budgetLabels[budget] || budget) : 'Nicht angegeben'}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Section -->
          <tr>
            <td style="padding: 0 48px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td style="padding: 24px;">
                    <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px 0;">Nachricht</p>
                    <p style="color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding: 0 48px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #2DD4E0 0%, #0055FF 100%); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 16px 32px; border-radius: 12px; margin: 0 6px; box-shadow: 0 10px 30px rgba(45,212,224,0.3);">
                      ✉️ Antworten
                    </a>
                    ${phone ? `
                    <a href="tel:${phone}" style="display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 16px 32px; border-radius: 12px; margin: 0 6px;">
                      📱 Anrufen
                    </a>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: rgba(0,0,0,0.3); padding: 24px 48px; border-top: 1px solid rgba(255,255,255,0.05);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">
                      Automatisch generiert · Origin Labs · Karl-Marx-Weg 20 · 06242 Krumpa
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Create confirmation email for customer - Ultra Modern Design
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background: linear-gradient(180deg, #0a0a0f 0%, #13131a 100%); min-height: 100vh;">
  <!-- Outer Container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; margin: 0 auto;">
    <tr>
      <td>
        <!-- Main Card with Glass Effect -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(145deg, rgba(30,30,40,0.95) 0%, rgba(20,20,28,0.98) 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px rgba(45,212,224,0.1);">

          <!-- Gradient Top Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #2DD4E0 0%, #0055FF 50%, #8B5CF6 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 48px 48px 32px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <div style="display: inline-block; width: 80px; height: 80px; background: linear-gradient(135deg, #2DD4E0 0%, #0055FF 100%); border-radius: 24px; text-align: center; line-height: 80px; margin-bottom: 24px; box-shadow: 0 20px 40px rgba(45,212,224,0.3);">
                      <span style="font-size: 36px;">✓</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.03em;">
                      Anfrage erhalten!
                    </h1>
                    <p style="color: rgba(255,255,255,0.5); font-size: 16px; margin: 0; line-height: 1.6;">
                      Vielen Dank für Ihr Interesse an Origin Labs
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 0 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(145deg, rgba(45,212,224,0.08) 0%, rgba(0,85,255,0.08) 100%); border-radius: 16px; border: 1px solid rgba(45,212,224,0.15);">
                <tr>
                  <td style="padding: 28px;">
                    <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                      Hallo ${name}! 👋
                    </p>
                    <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.8; margin: 0;">
                      Wir haben Ihre Projektanfrage erhalten und freuen uns über Ihr Interesse. Unser Team wird Ihre Anfrage prüfen und sich innerhalb von <strong style="color: #2DD4E0;">24 Stunden</strong> bei Ihnen melden.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Your Message -->
          <tr>
            <td style="padding: 24px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td style="padding: 24px;">
                    <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px 0;">Ihre Nachricht</p>
                    <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.8; margin: 0; font-style: italic; border-left: 3px solid rgba(45,212,224,0.5); padding-left: 16px;">"${message}"</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Next -->
          <tr>
            <td style="padding: 0 48px 32px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px 0;">Was passiert als nächstes?</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, rgba(45,212,224,0.2) 0%, rgba(45,212,224,0.1) 100%); border-radius: 8px; text-align: center; line-height: 32px;">
                            <span style="color: #2DD4E0; font-size: 14px; font-weight: 700;">1</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <p style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0;">Analyse Ihrer Anfrage</p>
                          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 4px 0 0 0;">Wir prüfen Ihre Anforderungen</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, rgba(0,85,255,0.2) 0%, rgba(0,85,255,0.1) 100%); border-radius: 8px; text-align: center; line-height: 32px;">
                            <span style="color: #60a5fa; font-size: 14px; font-weight: 700;">2</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <p style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0;">Persönliche Kontaktaufnahme</p>
                          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 4px 0 0 0;">Wir melden uns innerhalb von 24h</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.1) 100%); border-radius: 8px; text-align: center; line-height: 32px;">
                            <span style="color: #a78bfa; font-size: 14px; font-weight: 700;">3</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <p style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0;">Kostenloses Beratungsgespräch</p>
                          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 4px 0 0 0;">Gemeinsame Projektbesprechung</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 48px 40px; text-align: center;">
              <a href="https://origin-labs.de" style="display: inline-block; background: linear-gradient(135deg, #2DD4E0 0%, #0055FF 100%); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 16px 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(45,212,224,0.3);">
                Unsere Website besuchen →
              </a>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding: 0 48px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 24px;">
                <tr>
                  <td>
                    <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 0 0 8px 0;">
                      Mit freundlichen Grüßen,
                    </p>
                    <p style="color: #ffffff; font-size: 16px; font-weight: 700; margin: 0;">
                      Ihr Origin Labs Team
                    </p>
                  </td>
                  <td style="text-align: right; vertical-align: bottom;">
                    <img src="https://origin-labs.de/logo-full-dark.png" alt="Origin Labs" height="32" style="display: inline-block; height: 32px; opacity: 0.8;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: rgba(0,0,0,0.3); padding: 24px 48px; border-top: 1px solid rgba(255,255,255,0.05);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 8px 0;">
                      <a href="https://origin-labs.de" style="color: #2DD4E0; text-decoration: none;">origin-labs.de</a>
                    </p>
                    <p style="color: rgba(255,255,255,0.25); font-size: 12px; margin: 0;">
                      Karl-Marx-Weg 20 · 06242 Krumpa · Deutschland
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
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
