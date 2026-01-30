"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Track if header has animated (persists across page navigations)
let hasHeaderAnimated = false;

// Store previous indicator position for smooth transitions between pages
let previousIndicatorStyle = { left: 0, width: 0 };
let hasInitialPosition = false;

const navItems = [
  { label: "Home", href: "#hero", homeHref: "/" },
  { label: "Über uns", href: "/ueber-uns", isPage: true },
  { label: "Leistungen", href: "/leistungen", isPage: true },
  { label: "Preise", href: "/preise", isPage: true },
  { label: "Projekte", href: "/projekte", isPage: true },
  { label: "Kontakt", href: "/kontakt", isPage: true },
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
          className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-white/80"
              : "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-white/50"
          }`}
          layout
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group px-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Image
                src="/logo-full.png"
                alt="Origin Labs"
                width={300}
                height={75}
                className="h-14 w-auto sm:h-[72px]"
                priority
              />
            </motion.div>
          </Link>

          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-gradient-to-b from-transparent via-slate-grey/20 to-transparent mx-2" />

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden lg:flex items-center gap-0.5 relative">
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
                      className="relative px-4 py-2 font-body text-sm rounded-full overflow-hidden cursor-pointer block whitespace-nowrap"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-slate-grey/5 rounded-full"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: isActive ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className={`relative z-10 transition-colors duration-300 ${
                        isActive
                          ? "text-primary-blue font-medium"
                          : "text-slate-grey/70 hover:text-slate-grey"
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
                  className="relative px-4 py-2 font-body text-sm rounded-full overflow-hidden whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-slate-grey/5 rounded-full"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive
                        ? "text-primary-blue font-medium"
                        : "text-slate-grey/70 hover:text-slate-grey"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link href="/kontakt">
            <motion.span
              className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 gradient-primary text-white font-heading font-semibold text-sm rounded-full shadow-lg shadow-primary-blue/25 relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer Effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              <span className="relative z-10">Projekt starten</span>
              <svg
                className="w-4 h-4 relative z-10"
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
            </motion.span>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-grey/5 transition-colors"
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
              className="fixed inset-0 z-40 lg:hidden bg-slate-grey/20 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-24 left-4 right-4 z-50 lg:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 p-3 overflow-hidden">
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
                                : "text-slate-grey hover:bg-slate-grey/5"
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
                            : "text-slate-grey hover:bg-slate-grey/5"
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

                {/* CTA Button */}
                <motion.div
                  className="mt-3 pt-3 border-t border-slate-grey/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/kontakt" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="w-full flex items-center justify-center gap-2 px-6 py-4 gradient-primary text-white font-heading font-semibold rounded-2xl shadow-lg shadow-primary-blue/25 relative overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative z-10">Projekt starten</span>
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
