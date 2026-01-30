import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@origin-labs.de";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await hash(adminPassword, 12);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Admin",
      },
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log("Admin user already exists");
  }

  // Seed Contact Info
  const existingContact = await prisma.contactInfo.findUnique({
    where: { id: "main" },
  });

  if (!existingContact) {
    await prisma.contactInfo.create({
      data: {
        id: "main",
        phone: "+49 152 03037738",
        email: "info@origin-labs.de",
        companyName: "Origin Labs",
        street: "Karl-Marx-Weg 20",
        city: "06242 Krumpa",
        country: "Deutschland",
        responseTime: "24 Stunden",
        linkedIn: "https://linkedin.com/company/origin-labs",
        instagram: "https://instagram.com/originlabs",
        github: "https://github.com/origin-labs",
      },
    });
    console.log("Contact info created");
  }

  // Seed Pricing Tiers
  const existingTiers = await prisma.pricingTier.count();
  if (existingTiers === 0) {
    await prisma.pricingTier.createMany({
      data: [
        {
          name: "Websites",
          description: "Professionelle Websites für Ihr Unternehmen – von der Visitenkarte bis zum komplexen Webauftritt.",
          price: "ab 800",
          priceNote: "zzgl. MwSt.",
          features: JSON.stringify([
            "Responsive Design für alle Geräte",
            "SEO-Grundoptimierung",
            "Content Management System",
            "SSL-Zertifikat inklusive",
            "DSGVO-konforme Umsetzung",
            "Kontaktformular Integration",
            "3 Monate Support inklusive",
          ]),
          highlighted: false,
          ctaText: "Projekt anfragen",
          order: 0,
        },
        {
          name: "Webapps",
          description: "Maßgeschneiderte Webanwendungen für Ihre individuellen Geschäftsprozesse.",
          price: "ab 8.000",
          priceNote: "zzgl. MwSt.",
          features: JSON.stringify([
            "Individuelle Entwicklung",
            "Benutzer-Authentifizierung",
            "Datenbank-Integration",
            "API-Entwicklung",
            "Cloud-Hosting Setup",
            "Automatisierte Tests",
            "6 Monate Support inklusive",
            "Skalierbare Architektur",
          ]),
          highlighted: true,
          ctaText: "Projekt anfragen",
          order: 1,
        },
        {
          name: "Mobile Apps",
          description: "Native und Cross-Platform Apps für iOS und Android.",
          price: "ab 15.000",
          priceNote: "zzgl. MwSt.",
          features: JSON.stringify([
            "iOS & Android Entwicklung",
            "Cross-Platform (React Native)",
            "Push-Benachrichtigungen",
            "Offline-Funktionalität",
            "App Store Veröffentlichung",
            "Analytics Integration",
            "12 Monate Support inklusive",
            "Regelmäßige Updates",
          ]),
          highlighted: false,
          ctaText: "Projekt anfragen",
          order: 2,
        },
      ],
    });
    console.log("Pricing tiers created");
  }

  // Seed Projects
  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "E-Commerce Platform",
          subtitle: "Online Shop für Mode & Lifestyle",
          description: "Eine vollständige E-Commerce-Lösung mit Warenkorbfunktion, Zahlungsintegration und Bestandsverwaltung.",
          category: "webapps",
          tags: JSON.stringify(["Next.js", "Stripe", "PostgreSQL", "Tailwind"]),
          color: "from-violet-500 to-purple-600",
          year: "2024",
          link: "#",
          published: true,
          order: 0,
        },
        {
          title: "Corporate Website",
          subtitle: "Unternehmenswebsite für Beratungsfirma",
          description: "Moderne Unternehmenswebsite mit Fokus auf Conversion-Optimierung und SEO.",
          category: "websites",
          tags: JSON.stringify(["Next.js", "Framer Motion", "SEO"]),
          color: "from-cyan-500 to-blue-600",
          year: "2024",
          link: "#",
          published: true,
          order: 1,
        },
        {
          title: "Fitness Tracker App",
          subtitle: "Mobile App für Gesundheit & Fitness",
          description: "Cross-Platform App zur Erfassung von Workouts, Ernährung und Gesundheitsdaten.",
          category: "mobile",
          tags: JSON.stringify(["React Native", "Firebase", "HealthKit"]),
          color: "from-green-500 to-emerald-600",
          year: "2024",
          link: "#",
          published: true,
          order: 2,
        },
        {
          title: "SaaS Dashboard",
          subtitle: "Analytics Platform für Startups",
          description: "Datenvisualisierung und Reporting-Tool für Business Analytics.",
          category: "webapps",
          tags: JSON.stringify(["React", "D3.js", "Node.js", "MongoDB"]),
          color: "from-orange-500 to-red-600",
          year: "2023",
          link: "#",
          published: true,
          order: 3,
        },
        {
          title: "Restaurant Website",
          subtitle: "Online-Präsenz für Gastronomie",
          description: "Elegante Website mit Online-Reservierung und digitaler Speisekarte.",
          category: "websites",
          tags: JSON.stringify(["Next.js", "Sanity CMS", "Calendly"]),
          color: "from-amber-500 to-orange-600",
          year: "2023",
          link: "#",
          published: true,
          order: 4,
        },
        {
          title: "Banking App",
          subtitle: "Mobile Banking für Neobank",
          description: "Sichere Mobile-Banking-App mit biometrischer Authentifizierung und Echtzeit-Transaktionen.",
          category: "mobile",
          tags: JSON.stringify(["Flutter", "Kotlin", "Swift", "Plaid"]),
          color: "from-blue-500 to-indigo-600",
          year: "2023",
          link: "#",
          published: true,
          order: 5,
        },
      ],
    });
    console.log("Projects created");
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
