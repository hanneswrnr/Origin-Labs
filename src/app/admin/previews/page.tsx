"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { motion } from "framer-motion";

// Sample data for preview
const sampleData = {
  name: "Max Mustermann",
  email: "max@beispiel.de",
  company: "Musterfirma GmbH",
  phone: "+49 123 456789",
  service: "webapp",
  budget: "medium",
  message: "Hallo Origin Labs Team,\n\nwir sind auf der Suche nach einem Partner für die Entwicklung einer modernen Webapp für unser Unternehmen. Die Anwendung soll unseren Kunden ermöglichen, ihre Bestellungen online zu verwalten.\n\nKönnten wir einen Termin für ein erstes Gespräch vereinbaren?\n\nMit freundlichen Grüßen,\nMax Mustermann",
};

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

export default function PreviewsPage() {
  const [activeTemplate, setActiveTemplate] = useState<"notification" | "confirmation">("notification");

  const submittedAt = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date());

  // Notification email for Origin Labs
  const notificationHtml = `
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
        <div style="display: inline-block; background-color: #ffffff; padding: 12px 24px; border-radius: 12px;">
          <img src="/logo-full.png" alt="Origin Labs" height="32" style="display: block; height: 32px;">
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
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${sampleData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">E-Mail</td>
              <td style="padding: 8px 0;"><a href="mailto:${sampleData.email}" style="color: #0055FF; font-size: 14px; font-weight: 600; text-decoration: none;">${sampleData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Unternehmen</td>
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${sampleData.company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Telefon</td>
              <td style="padding: 8px 0;"><a href="tel:${sampleData.phone}" style="color: #0055FF; font-size: 14px; font-weight: 600; text-decoration: none;">${sampleData.phone}</a></td>
            </tr>
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
                  ${serviceLabels[sampleData.service]}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Budget</td>
              <td style="padding: 8px 0;">
                <span style="background-color: #f3e8ff; color: #7c3aed; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 20px;">
                  ${budgetLabels[sampleData.budget]}
                </span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Message -->
        <div style="margin-bottom: 32px;">
          <h2 style="color: #1a1a2e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">
            Nachricht
          </h2>
          <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; border-left: 4px solid #2DD4E0;">
            <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${sampleData.message}</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div style="text-align: center;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">
            Schnellaktionen
          </p>
          <a href="mailto:${sampleData.email}" style="display: inline-block; background-color: #0055FF; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 0 8px;">
            Antworten
          </a>
          <a href="tel:${sampleData.phone}" style="display: inline-block; background-color: #ffffff; color: #0055FF; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; border: 2px solid #0055FF; margin: 0 8px;">
            Anrufen
          </a>
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

  // Confirmation email for customer
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
        <div style="display: inline-block; background-color: #ffffff; padding: 12px 24px; border-radius: 12px;">
          <img src="/logo-full.png" alt="Origin Labs" height="32" style="display: block; height: 32px;">
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px;">
        <h1 style="color: #1a1a2e; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">
          Vielen Dank für Ihre Anfrage!
        </h1>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          Hallo ${sampleData.name},
        </p>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          wir haben Ihre Projektanfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
        </p>
        <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; border-left: 4px solid #2DD4E0; margin: 24px 0;">
          <p style="color: #374151; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Ihre Nachricht:</p>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">"${sampleData.message}"</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminSidebar />

      <main className="lg:pl-72 min-h-screen">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-slate-900">E-Mail Previews</h1>
            <p className="text-slate-500 mt-2">
              Vorschau der E-Mail-Templates für das Kontaktformular
            </p>
          </motion.div>

          {/* Template Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-2 inline-flex gap-2 mb-6"
          >
            <button
              onClick={() => setActiveTemplate("notification")}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTemplate === "notification"
                  ? "bg-gradient-to-r from-primary-cyan to-primary-blue text-white shadow-lg shadow-primary-blue/25"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Benachrichtigung (An Origin Labs)
            </button>
            <button
              onClick={() => setActiveTemplate("confirmation")}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTemplate === "confirmation"
                  ? "bg-gradient-to-r from-primary-cyan to-primary-blue text-white shadow-lg shadow-primary-blue/25"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Bestätigung (An Kunde)
            </button>
          </motion.div>

          {/* Template Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-cyan to-primary-blue rounded-xl flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {activeTemplate === "notification"
                    ? "Benachrichtigungs-E-Mail"
                    : "Bestätigungs-E-Mail"}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {activeTemplate === "notification"
                    ? "Diese E-Mail wird an info@origin-labs.de gesendet, wenn jemand das Kontaktformular ausfüllt."
                    : "Diese E-Mail wird automatisch an den Kunden gesendet, um den Eingang seiner Anfrage zu bestätigen."}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">Von:</span>
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                      {activeTemplate === "notification"
                        ? '"Origin Labs Website" <info@origin-labs.de>'
                        : '"Origin Labs" <info@origin-labs.de>'}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">An:</span>
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                      {activeTemplate === "notification"
                        ? "info@origin-labs.de"
                        : sampleData.email}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Email Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-slate-500 ml-4">E-Mail Vorschau</span>
              </div>
              <iframe
                srcDoc={activeTemplate === "notification" ? notificationHtml : confirmationHtml}
                className="w-full h-[700px] border-0"
                title="Email Preview"
              />
            </div>
          </motion.div>

          {/* Sample Data Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">Beispieldaten</h3>
                <p className="text-amber-700 text-sm mt-1">
                  Die Vorschau verwendet Beispieldaten. In der echten E-Mail werden die tatsächlichen
                  Formulardaten des Kunden angezeigt.
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-amber-600 font-medium">Name:</span>{" "}
                    <span className="text-amber-900">{sampleData.name}</span>
                  </div>
                  <div>
                    <span className="text-amber-600 font-medium">E-Mail:</span>{" "}
                    <span className="text-amber-900">{sampleData.email}</span>
                  </div>
                  <div>
                    <span className="text-amber-600 font-medium">Unternehmen:</span>{" "}
                    <span className="text-amber-900">{sampleData.company}</span>
                  </div>
                  <div>
                    <span className="text-amber-600 font-medium">Telefon:</span>{" "}
                    <span className="text-amber-900">{sampleData.phone}</span>
                  </div>
                  <div>
                    <span className="text-amber-600 font-medium">Leistung:</span>{" "}
                    <span className="text-amber-900">{serviceLabels[sampleData.service]}</span>
                  </div>
                  <div>
                    <span className="text-amber-600 font-medium">Budget:</span>{" "}
                    <span className="text-amber-900">{budgetLabels[sampleData.budget]}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
