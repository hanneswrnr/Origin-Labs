"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";

// Track if header has animated (persists across page navigations)
let hasHeaderAnimated = false;

// Store previous indicator position for smooth transitions between pages
let previousIndicatorStyle = { left: 0, width: 0 };
let hasInitialPosition = false;

const getNavItems = (t: (key: string) => string) => [
  { label: t("common.home"), href: "#hero", homeHref: "/" },
  { label: t("common.aboutUs"), href: "/ueber-uns", isPage: true },
  { label: t("common.services"), href: "/leistungen", isPage: true },
  { label: t("common.pricing"), href: "/preise", isPage: true },
  { label: t("common.projects"), href: "/projekte", isPage: true },
  { label: t("common.contact"), href: "/kontakt", isPage: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [shouldAnimate, setShouldAnimate] = useState(!hasHeaderAnimated);
  const [indicatorStyle, setIndicatorStyle] = useState(previousIndicatorStyle);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const { theme, isHydrated } = useTheme();
  const { t } = useTranslation();
  const navItems = getNavItems(t);

  // Mark header as animated after first render
  useEffect(() => {
    if (!hasHeaderAnimated) {
      hasHeaderAnimated = true;
    }
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Calculate active indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = navItems.findIndex((item) => {
        if (item.isPage) return pathname === item.href;
        return isHomePage && activeSection === item.href.slice(1);
      });

      if (activeIndex !== -1 && navRef.current && itemRefs.current[activeIndex]) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = itemRefs.current[activeIndex]!.getBoundingClientRect();
        const newStyle = {
          left: activeRect.left - navRect.left,
          width: activeRect.width,
        };

        setIndicatorStyle(newStyle);
        // Store for next page navigation
        previousIndicatorStyle = newStyle;
        hasInitialPosition = true;

        // Mark first render complete after a short delay
        if (isFirstRender) {
          setTimeout(() => setIsFirstRender(false), 50);
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      updateIndicator();
    });

    // Also update on window resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [pathname, activeSection, isHomePage, isFirstRender]);

  useEffect(() => {
    // Only detect active sections on homepage
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.filter(item => !item.isPage).map((item) => item.href.slice(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Default to hero when at top
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavClick = (href: string, homeHref?: string) => {
    setIsMobileMenuOpen(false);

    // If we're not on homepage and it's an anchor link, navigate to homepage first
    if (!isHomePage && href.startsWith("#")) {
      if (homeHref) {
        router.push(homeHref);
      } else {
        router.push("/" + href);
      }
      return;
    }

    // On homepage, scroll to section
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Determine which logo to show based on theme
  const logoSrc = isHydrated && theme === "dark" ? "/logo-full-dark.png" : "/logo-full.png";

  return (
    <>
      {/* Floating Oval Header */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        initial={shouldAnimate ? { y: -100, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.nav
          className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${
            isScrolled
              ? "bg-nav-bg-scrolled backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-nav-border"
              : "bg-nav-bg backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-nav-border"
          }`}
          layout
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group pl-1 pr-3 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Image
                src={logoSrc}
                alt="Origin Labs"
                width={300}
                height={75}
                className="h-14 w-auto sm:h-[72px]"
                priority
              />
            </motion.div>
          </Link>

          {/* Divider */}
          <div className="hidden xl:block w-px h-6 bg-gradient-to-b from-transparent via-slate-grey/20 to-transparent mx-2" />

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden xl:flex items-center gap-0.5 relative">
            {/* Sliding Active Indicator */}
            {indicatorStyle.width > 0 && (
              <motion.div
                className="absolute top-0 h-full bg-gradient-to-r from-primary-cyan/20 to-primary-blue/20 rounded-full pointer-events-none border border-primary-cyan/10"
                initial={
                  hasInitialPosition && isFirstRender
                    ? { left: previousIndicatorStyle.left, width: previousIndicatorStyle.width, opacity: 1 }
                    : false
                }
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: 1,
                }}
                transition={{
                  left: { type: "spring", stiffness: 120, damping: 18, mass: 1.2 },
                  width: { type: "spring", stiffness: 150, damping: 20 },
                  opacity: { duration: 0.15 },
                }}
              />
            )}

            {navItems.map((item, index) => {
              // Active state: check page route or section anchor on homepage
              const isPageActive = item.isPage && pathname === item.href;
              const isSectionActive = !item.isPage && isHomePage && activeSection === item.href.slice(1);
              const isActive = isPageActive || isSectionActive;

              if (item.isPage) {
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.span
                      ref={(el) => { itemRefs.current[index] = el; }}
                      className="relative px-4 py-2 font-body text-sm rounded-full overflow-hidden cursor-pointer block whitespace-nowrap group/nav"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Modern Hover Background with Gradient */}
                      <motion.span
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-cyan/10 via-primary-blue/10 to-primary-cyan/10
                                   dark:from-primary-cyan/15 dark:via-primary-blue/15 dark:to-primary-cyan/15
                                   opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                      />
                      {/* Subtle glow effect */}
                      <motion.span
                        className="absolute inset-0 rounded-full shadow-[inset_0_0_12px_rgba(45,212,224,0.15)]
                                   dark:shadow-[inset_0_0_12px_rgba(45,212,224,0.25)]
                                   opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                      />
                      {/* Bottom accent line */}
                      <motion.span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-full
                                   group-hover/nav:w-4 transition-all duration-300 ease-out"
                        style={{ display: isActive ? 'none' : 'block' }}
                      />
                      <span className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? "text-primary-blue font-semibold"
                          : "text-text-muted group-hover/nav:text-primary-blue dark:group-hover/nav:text-primary-cyan"
                      }`}>
                        {item.label}
                      </span>
                    </motion.span>
                  </Link>
                );
              }

              return (
                <motion.button
                  key={item.href}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  onClick={() => handleNavClick(item.href, item.homeHref)}
                  className="relative px-4 py-2 font-body text-sm rounded-full overflow-hidden whitespace-nowrap group/nav"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Modern Hover Background with Gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-cyan/10 via-primary-blue/10 to-primary-cyan/10
                               dark:from-primary-cyan/15 dark:via-primary-blue/15 dark:to-primary-cyan/15
                               opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                  />
                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full shadow-[inset_0_0_12px_rgba(45,212,224,0.15)]
                               dark:shadow-[inset_0_0_12px_rgba(45,212,224,0.25)]
                               opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                  />
                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-full
                               group-hover/nav:w-4 transition-all duration-300 ease-out"
                    style={{ display: isActive ? 'none' : 'block' }}
                  />

                  <span
                    className={`relative z-10 transition-all duration-300 ${
                      isActive
                        ? "text-primary-blue font-semibold"
                        : "text-text-muted group-hover/nav:text-primary-blue dark:group-hover/nav:text-primary-cyan"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Theme Toggle & Language Selector - Desktop */}
          <div className="hidden xl:flex items-center gap-1 ml-1">
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* CTA Button - Icon only */}
          <Link href="/kontakt">
            <motion.span
              className="hidden xl:flex items-center justify-center w-10 h-10 ml-1 gradient-primary text-white rounded-full shadow-lg shadow-primary-blue/25 relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
              title={t("common.startProject")}
            >
              {/* Shimmer Effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
              />
              {/* Rocket Icon */}
              <svg
                className="w-5 h-5 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </motion.span>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            className="xl:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-hover-bg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Menü"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <motion.span
                className="block h-0.5 bg-slate-grey rounded-full origin-center"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="block h-0.5 bg-slate-grey rounded-full"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scaleX: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-slate-grey rounded-full origin-center"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 xl:hidden bg-slate-grey/20 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-24 left-4 right-4 z-50 xl:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-mobile-menu-bg backdrop-blur-2xl rounded-3xl shadow-2xl border border-nav-border p-3 overflow-hidden">
                {/* Navigation Items */}
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => {
                    // Active state: check page route or section anchor on homepage
                    const isPageActive = item.isPage && pathname === item.href;
                    const isSectionActive = !item.isPage && isHomePage && activeSection === item.href.slice(1);
                    const isActive = isPageActive || isSectionActive;

                    if (item.isPage) {
                      return (
                        <Link key={item.href} href={item.href}>
                          <motion.span
                            className={`relative flex items-center justify-between font-body text-lg py-3.5 px-5 rounded-2xl text-left transition-all cursor-pointer ${
                              isActive
                                ? "bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10 text-primary-blue"
                                : "text-slate-grey hover:bg-hover-bg"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.04 + 0.1 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="flex items-center gap-3">
                              <motion.span
                                className="w-1.5 h-1.5 rounded-full"
                                initial={false}
                                animate={{
                                  scale: isActive ? 1 : 0,
                                  backgroundColor: isActive ? "#2DD4E0" : "transparent",
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              />
                              {item.label}
                            </span>
                            <motion.svg
                              className="w-5 h-5 text-primary-blue"
                              initial={false}
                              animate={{ opacity: isActive ? 1 : 0 }}
                              transition={{ duration: 0.2 }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </motion.svg>
                          </motion.span>
                        </Link>
                      );
                    }

                    return (
                      <motion.button
                        key={item.href}
                        onClick={() => handleNavClick(item.href, item.homeHref)}
                        className={`relative flex items-center justify-between font-body text-lg py-3.5 px-5 rounded-2xl text-left transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10 text-primary-blue"
                            : "text-slate-grey hover:bg-hover-bg"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 + 0.1 }}
                      >
                        <span className="flex items-center gap-3">
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full"
                            initial={false}
                            animate={{
                              scale: isActive ? 1 : 0,
                              backgroundColor: isActive ? "#2DD4E0" : "transparent",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          />
                          {item.label}
                        </span>
                        <motion.svg
                          className="w-5 h-5 text-primary-blue"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </motion.svg>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Theme Toggle - Mobile */}
                <motion.div
                  className="flex items-center justify-between px-5 py-3 mt-2 border-t border-divider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="font-body text-sm text-text-muted">{t("common.appearance")}</span>
                  <ThemeToggle />
                </motion.div>

                {/* Language Selector - Mobile */}
                <motion.div
                  className="flex items-center justify-between px-5 py-3 border-t border-divider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="font-body text-sm text-text-muted">{t("common.language")}</span>
                  <LanguageSelector />
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  className="mt-2 pt-3 border-t border-divider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link href="/kontakt" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="w-full flex items-center justify-center gap-2 px-6 py-4 gradient-primary text-white font-heading font-semibold rounded-2xl shadow-lg shadow-primary-blue/25 relative overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      {/* Left spacer for visual balance */}
                      <span className="w-5 relative z-10" />
                      <span className="relative z-10">{t("common.startProject")}</span>
                      <svg
                        className="w-5 h-5 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
