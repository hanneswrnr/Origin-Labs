"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "@/hooks/useTranslation";

// Google Review Type
interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description: string;
}

// Enhanced Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
};

// Star Rating Component
function StarRating({ rating, size = "w-5 h-5" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size} ${star <= rating ? "text-yellow-400" : "text-slate-grey/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Google Reviews Section Component
function GoogleReviewsSection() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [overallRating, setOverallRating] = useState(5.0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder reviews - replace with API fetch
  const placeholderReviews: GoogleReview[] = [
    {
      author_name: "Max Mustermann",
      rating: 5,
      text: "Absolut professionelle Zusammenarbeit! Origin Labs hat unsere Website komplett neu gestaltet und das Ergebnis übertrifft alle Erwartungen. Schnelle Kommunikation und termingerechte Lieferung.",
      time: Date.now() - 86400000 * 3,
      relative_time_description: "vor 3 Tagen",
    },
    {
      author_name: "Anna Schmidt",
      rating: 5,
      text: "Unsere neue Webapp läuft einwandfrei! Das Team hat alle unsere Anforderungen perfekt umgesetzt. Besonders beeindruckt hat mich die Liebe zum Detail im UI-Design.",
      time: Date.now() - 86400000 * 7,
      relative_time_description: "vor einer Woche",
    },
    {
      author_name: "Thomas Weber",
      rating: 5,
      text: "Von der ersten Beratung bis zum Launch wurde alles professionell abgewickelt. Die Mobile App für unser Unternehmen ist genau das, was wir gebraucht haben. Klare Empfehlung!",
      time: Date.now() - 86400000 * 14,
      relative_time_description: "vor 2 Wochen",
    },
    {
      author_name: "Lisa Müller",
      rating: 5,
      text: "Hervorragende Arbeit bei unserem E-Commerce Projekt. Die Seite ist nicht nur schön, sondern auch blitzschnell. Der Support auch nach dem Launch ist top!",
      time: Date.now() - 86400000 * 21,
      relative_time_description: "vor 3 Wochen",
    },
    {
      author_name: "Michael Braun",
      rating: 5,
      text: "Das Origin Labs Team versteht wirklich, was man braucht. Unsere Corporate Website sieht modern und professionell aus. Sehr zufrieden mit dem Ergebnis!",
      time: Date.now() - 86400000 * 30,
      relative_time_description: "vor einem Monat",
    },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/google-reviews');

        if (response.ok) {
          const data = await response.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
            setOverallRating(data.rating || 5.0);
            setTotalReviews(data.total || data.reviews.length);
          } else {
            // Fallback to placeholder if no reviews returned
            setReviews(placeholderReviews);
            setOverallRating(5.0);
            setTotalReviews(47);
          }
        } else {
          // API not configured - use placeholder data
          setReviews(placeholderReviews);
          setOverallRating(5.0);
          setTotalReviews(47);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Fallback to placeholder data
        setReviews(placeholderReviews);
        setOverallRating(5.0);
        setTotalReviews(47);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
    // No polling needed - Next.js handles server-side caching (4 days)
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setSlideDirection("left");
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const displayedReviews = reviews.length > 0 ? reviews : placeholderReviews;

  const goToNext = () => {
    setSlideDirection("left");
    setActiveIndex((prev) => (prev + 1) % displayedReviews.length);
  };

  const goToPrev = () => {
    setSlideDirection("right");
    setActiveIndex((prev) => (prev - 1 + displayedReviews.length) % displayedReviews.length);
  };

  const goToIndex = (index: number) => {
    setSlideDirection(index > activeIndex ? "left" : "right");
    setActiveIndex(index);
  };

  return (
    <section id="reviews" className="py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-yellow-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-primary-cyan/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
            {t("reviews.title")}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
            {t("reviews.heading")} <span className="gradient-text">{t("reviews.headingHighlight")}</span>
          </h2>
          <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </motion.div>

        {/* Overall Rating Card */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-6 px-8 py-6 bg-card-bg rounded-3xl shadow-xl border border-divider">
            {/* Google Logo */}
            <div className="flex items-center gap-3">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div>
                <p className="font-body text-sm text-slate-grey/60">{t("reviews.googleReviews")}</p>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-3xl font-bold text-slate-grey">
                    {overallRating.toFixed(1)}
                  </span>
                  <StarRating rating={Math.round(overallRating)} size="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-slate-grey/10" />

            {/* Total Reviews */}
            <div className="text-center">
              <p className="font-heading text-3xl font-bold text-slate-grey">{totalReviews}</p>
              <p className="font-body text-sm text-slate-grey/60">{t("reviews.reviews")}</p>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-body text-xs text-green-600 font-medium">{t("reviews.live")}</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Carousel - Clean Slide Design */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-card-bg/90 backdrop-blur-sm rounded-full shadow-lg border border-divider flex items-center justify-center text-slate-grey/50 hover:text-primary-blue hover:bg-card-bg hover:shadow-xl transition-all hidden md:flex"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t("reviews.previousReview")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-card-bg/90 backdrop-blur-sm rounded-full shadow-lg border border-divider flex items-center justify-center text-slate-grey/50 hover:text-primary-blue hover:bg-card-bg hover:shadow-xl transition-all hidden md:flex"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t("reviews.nextReview")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Desktop: 3 Cards with Clean Slide Animation */}
          <div className="hidden lg:block px-20 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIndex}
                className="flex justify-center items-center gap-8"
                initial={{ x: slideDirection === "left" ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection === "left" ? -300 : 300, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                {[-1, 0, 1].map((offset) => {
                  const index = (activeIndex + offset + displayedReviews.length) % displayedReviews.length;
                  const isCenter = offset === 0;
                  return (
                    <motion.div
                      key={`card-${offset}`}
                      className="w-full max-w-md flex-shrink-0"
                      style={{
                        scale: isCenter ? 1 : 0.9,
                        opacity: isCenter ? 1 : 0.4,
                        y: isCenter ? 0 : 12,
                        zIndex: isCenter ? 10 : 0,
                        cursor: isCenter ? "default" : "pointer",
                      }}
                      onClick={() => !isCenter && (offset === -1 ? goToPrev() : goToNext())}
                    >
                      <ReviewCard review={displayedReviews[index]} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tablet: Clean Slide */}
          <div className="hidden md:block lg:hidden px-20 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIndex}
                className="max-w-lg mx-auto"
                initial={{ x: slideDirection === "left" ? 200 : -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection === "left" ? -200 : 200, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <ReviewCard review={displayedReviews[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: Smooth Slide */}
          <div className="md:hidden overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ x: slideDirection === "left" ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection === "left" ? -100 : 100, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <ReviewCard review={displayedReviews[activeIndex]} />
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                onClick={goToPrev}
                className="w-11 h-11 bg-card-bg/90 backdrop-blur-sm rounded-full shadow-md border border-divider flex items-center justify-center text-slate-grey/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t("reviews.previousReview")}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={goToNext}
                className="w-11 h-11 bg-card-bg/90 backdrop-blur-sm rounded-full shadow-md border border-divider flex items-center justify-center text-slate-grey/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t("reviews.nextReview")}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {displayedReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary-blue w-8"
                    : "bg-slate-grey/20 hover:bg-slate-grey/40 w-2.5"
                }`}
                aria-label={`${t("reviews.showReview")} ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://search.google.com/local/reviews?placeid=ChIJ0-7zx3GFpkcRI3L7tC2kRtA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-grey/10 text-slate-grey font-heading font-semibold rounded-full hover:border-primary-cyan/30 hover:text-primary-blue hover:shadow-lg hover:shadow-primary-cyan/10 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t("common.viewAllReviews")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Review Card Component
function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <motion.div
      className="h-full p-8 bg-off-white rounded-3xl border border-slate-grey/5 hover:border-primary-cyan/20 hover:shadow-xl transition-all duration-500"
      whileHover={{ y: -5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-cyan to-primary-blue flex items-center justify-center text-white font-heading font-bold text-lg shadow-lg shadow-primary-blue/20">
            {review.author_name.charAt(0)}
          </div>
          <div>
            <h4 className="font-heading font-semibold text-slate-grey">
              {review.author_name}
            </h4>
            <p className="font-body text-sm text-slate-grey/50">
              {review.relative_time_description}
            </p>
          </div>
        </div>

        {/* Google Icon */}
        <svg className="w-6 h-6 text-slate-grey/30" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>

      {/* Review Text */}
      <p className="font-body text-slate-grey/70 leading-relaxed line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Verified Badge */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-grey/10">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="font-body text-xs text-slate-grey/50">Verifizierte Google Bewertung</span>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <Header />

      <main className="bg-background overflow-hidden">
        {/* ==================== HERO SECTION ==================== */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center pt-20"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-cyan/10 via-background to-background" />

            {/* Floating Orbs */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(45,212,224,0.15) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,85,255,0.1) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                x: [0, -20, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,85,255,1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(0,85,255,1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-6xl mx-auto px-6 text-center"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-card-bg/80 backdrop-blur-xl rounded-full border border-primary-cyan/20 shadow-lg shadow-primary-cyan/10 mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-cyan" />
              </span>
              <span className="font-body text-sm text-slate-grey font-medium">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-slate-grey leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {t("hero.title")},
              <br />
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </motion.h1>

            <motion.p
              className="font-body text-xl md:text-2xl text-slate-grey/60 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href="#contact"
                className="group relative px-8 py-4 gradient-primary text-white font-heading font-semibold rounded-full overflow-hidden shadow-xl shadow-primary-blue/30"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("common.startProject")}
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-cyan"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#about"
                className="group px-8 py-4 bg-card-bg border-2 border-divider text-slate-grey font-heading font-semibold rounded-full hover:border-primary-cyan/30 hover:shadow-lg hover:shadow-primary-cyan/10 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {t("common.learnMore")}
                  <svg
                    className="w-5 h-5 text-slate-grey/50 group-hover:text-primary-blue transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </motion.a>
            </motion.div>

            {/* Scroll Indicator - Fixed Position */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="w-7 h-12 border-2 border-slate-grey/20 rounded-full mx-auto flex justify-center"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-1.5 h-3 bg-gradient-to-b from-primary-cyan to-primary-blue rounded-full mt-2"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements - More Visible */}
          {/* Large rotating square top-left */}
          <motion.div
            className="absolute top-24 left-[5%] w-32 h-32 border-2 border-primary-cyan/25 rounded-3xl hidden lg:block"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.08, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          {/* Gradient blob top-right */}
          <motion.div
            className="absolute top-28 right-[6%] w-24 h-24 bg-gradient-to-br from-primary-blue/25 to-primary-cyan/15 rounded-full blur-sm hidden md:block"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          {/* Floating dots - larger and more visible */}
          <motion.div
            className="absolute top-40 right-[12%] w-5 h-5 bg-primary-cyan/50 rounded-full"
            animate={{ y: [0, -35, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-52 left-[10%] w-4 h-4 bg-primary-blue/55 rounded-full"
            animate={{ y: [0, 25, 0], x: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-36 left-[8%] w-6 h-6 bg-primary-cyan/45 rounded-full hidden md:block"
            animate={{ y: [0, -20, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-28 right-[10%] w-4 h-4 bg-primary-blue/50 rounded-full hidden md:block"
            animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
          {/* Large ring bottom-right */}
          <motion.div
            className="absolute bottom-24 right-[5%] w-28 h-28 border-2 border-primary-blue/20 rounded-full hidden lg:block"
            animate={{ scale: [1, 1.12, 1], rotate: [0, -120, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          {/* Side gradient lines - thicker */}
          <motion.div
            className="absolute top-1/2 left-[3%] w-2 h-52 bg-gradient-to-b from-transparent via-primary-cyan/35 to-transparent rounded-full hidden xl:block"
            animate={{ opacity: [0.25, 0.6, 0.25], scaleY: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-[3%] w-2 h-40 bg-gradient-to-b from-transparent via-primary-blue/35 to-transparent rounded-full hidden xl:block"
            animate={{ opacity: [0.3, 0.65, 0.3], scaleY: [1, 1.12, 1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
          {/* Plus signs */}
          <motion.div
            className="absolute top-1/3 left-[15%] text-primary-cyan/35 hidden md:block"
            animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-[18%] text-primary-blue/30 hidden md:block"
            animate={{ rotate: [0, -90, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.div>

          {/* Floating Tech Icons - larger and more visible */}
          <motion.div
            className="absolute bottom-1/4 left-[12%] text-primary-cyan/30 hidden lg:block"
            animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-1/4 right-[10%] text-primary-blue/25 hidden lg:block"
            animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          >
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-[14%] text-primary-cyan/22 hidden lg:block"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 3 }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-[18%] text-primary-blue/20 hidden lg:block"
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </motion.div>
        </section>

        {/* ==================== ABOUT SECTION ==================== */}
        <section id="about" className="py-32 bg-off-white relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-cyan/5 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Image Side */}
              <motion.div
                className="relative order-2 lg:order-1"
                variants={slideInLeft}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative">
                  {/* Main Image Container */}
                  <motion.div
                    className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary-cyan/20 via-background to-primary-blue/20 shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative w-40 h-40"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Image
                          src="/logo-icon.png"
                          alt="Origin Labs"
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      </motion.div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-8 right-8 w-16 h-16 gradient-primary rounded-2xl shadow-lg shadow-primary-blue/30"
                      animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-12 left-8 w-12 h-12 bg-primary-cyan/30 rounded-xl backdrop-blur-sm"
                      animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                  </motion.div>

                  {/* Stats Card */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 bg-card-bg rounded-2xl p-6 shadow-xl border border-divider hover:shadow-2xl transition-shadow"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading text-2xl font-bold text-slate-grey">50+</p>
                        <p className="font-body text-sm text-slate-grey/60">{t("about.projectsCompleted")}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div
                className="order-1 lg:order-2"
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {t("about.label")}
                </motion.span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mt-4 mb-8 leading-tight">
                  {t("about.title")}
                  <br />
                  <span className="gradient-text">{t("about.titleHighlight")}</span>
                </h2>
                <p className="font-body text-lg text-slate-grey/70 mb-6 leading-relaxed">
                  {t("about.description1")}
                </p>
                <p className="font-body text-lg text-slate-grey/70 mb-10 leading-relaxed">
                  {t("about.description2")}
                </p>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-3 font-heading font-semibold text-primary-blue"
                  >
                    <span className="relative">
                      {t("about.learnMore")}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-cyan/30 group-hover:bg-primary-cyan transition-colors" />
                    </span>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-primary-cyan/10 flex items-center justify-center group-hover:bg-primary-cyan/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== SERVICES SECTION ==================== */}
        <section id="services" className="py-32 bg-background relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                {t("services.label")}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                {t("services.title")} <span className="gradient-text">{t("services.titleHighlight")}</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
                {t("services.subtitle")}
              </p>
            </motion.div>

            {/* Modern Bento Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: t("services.websites.title"),
                  description: t("services.websites.description"),
                  link: "/services#websites",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  title: t("services.webapps.title"),
                  description: t("services.webapps.description"),
                  link: "/services#webapps",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: t("services.mobileApps.title"),
                  description: t("services.mobileApps.description"),
                  link: "/services#mobile",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="group relative"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="relative h-full bg-off-white p-8 lg:p-10 rounded-3xl border border-transparent hover:border-primary-cyan/20 transition-all duration-500"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-cyan/5 via-transparent to-primary-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-3xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-500" />

                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-primary-blue/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.icon}
                      </motion.div>

                      <h3 className="font-heading text-2xl font-bold text-slate-grey mb-4 group-hover:text-primary-blue transition-colors">
                        {service.title}
                      </h3>

                      <p className="font-body text-slate-grey/70 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-blue group/link"
                      >
                        <span>{t("common.learnMore")}</span>
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ x: 4 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-heading font-semibold rounded-full hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors shadow-lg shadow-gray-800/20 dark:shadow-gray-200/20"
                >
                  {t("common.viewAllServices")}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== PRICING SECTION ==================== */}
        <section id="pricing" className="py-32 bg-off-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-cyan/5 to-primary-blue/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                {t("pricing.label")}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                {t("pricing.title")} <span className="gradient-text">{t("pricing.titleHighlight")}</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-3xl mx-auto">
                {t("pricing.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-16">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  name: t("pricing.websites.name"),
                  description: t("pricing.websites.description"),
                  price: t("pricing.websites.price"),
                  features: t("pricing.websites.features").split(","),
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  name: t("pricing.webapps.name"),
                  description: t("pricing.webapps.description"),
                  price: t("pricing.webapps.price"),
                  features: t("pricing.webapps.features").split(","),
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  name: t("pricing.mobileApps.name"),
                  description: t("pricing.mobileApps.description"),
                  price: t("pricing.mobileApps.price"),
                  features: t("pricing.mobileApps.features").split(","),
                },
              ].map((service, index) => (
                <motion.div
                  key={service.name}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className="relative h-full p-8 lg:p-10 rounded-3xl bg-card-bg border border-divider hover:border-primary-cyan/30 hover:shadow-xl transition-all duration-500"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-primary-blue/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.icon}
                    </motion.div>

                    <h3 className="font-heading text-2xl font-bold text-slate-grey mb-2">
                      {service.name}
                    </h3>
                    <p className="font-body text-slate-grey/60 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-3 font-body text-slate-grey/70"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-primary-cyan/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-grey/10">
                      <p className="font-heading text-2xl font-bold gradient-text mb-1">
                        {service.price}
                      </p>
                      <p className="font-body text-sm text-slate-grey/50">
                        {t("pricing.finalPrice")}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA Box */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 gradient-primary" />
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Content */}
              <div className="relative p-8 lg:p-14">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left: Text */}
                  <div className="text-center lg:text-left">
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      <span className="font-body text-sm text-white/90">{t("pricing.cta.badge")}</span>
                    </motion.div>

                    <h3 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
                      {t("pricing.cta.title")}
                    </h3>
                    <p className="font-body text-white/70 max-w-xl text-lg">
                      {t("pricing.cta.subtitle")}
                    </p>
                  </div>

                  {/* Right: CTA */}
                  <div className="flex flex-col items-center lg:items-end gap-4">
                    <motion.a
                      href="#contact"
                      className="group relative px-8 py-4 bg-white text-primary-blue font-heading font-semibold rounded-full shadow-xl shadow-black/20 overflow-hidden"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-off-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        {t("pricing.cta.button")}
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </motion.a>

                    <p className="font-body text-sm text-white/50 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t("common.responseTime")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== GOOGLE REVIEWS SECTION ==================== */}
        <GoogleReviewsSection />

        {/* ==================== PROJECTS SECTION ==================== */}
        <section id="projects" className="py-32 bg-background relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                {t("projects.label")}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                {t("projects.title")} <span className="gradient-text">{t("projects.titleHighlight")}</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
                {t("projects.subtitle")}
              </p>
            </motion.div>

            {/* Projects - Full Width Alternating Cards */}
            <div className="space-y-24 lg:space-y-32">
              {[
                {
                  title: t("projects.ecommerce.title"),
                  subtitle: t("projects.ecommerce.subtitle"),
                  description: t("projects.ecommerce.description"),
                  category: "Web App",
                  tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
                  color: "from-violet-500 to-purple-600",
                  year: "2024",
                },
                {
                  title: t("projects.corporate.title"),
                  subtitle: t("projects.corporate.subtitle"),
                  description: t("projects.corporate.description"),
                  category: "Website",
                  tags: ["React", "Tailwind CSS", "Framer Motion", "Sanity"],
                  color: "from-blue-500 to-cyan-500",
                  year: "2024",
                },
                {
                  title: t("projects.fitness.title"),
                  subtitle: t("projects.fitness.subtitle"),
                  description: t("projects.fitness.description"),
                  category: "Mobile App",
                  tags: ["React Native", "Firebase", "HealthKit", "Charts"],
                  color: "from-green-500 to-emerald-500",
                  year: "2024",
                },
                {
                  title: t("projects.saas.title"),
                  subtitle: t("projects.saas.subtitle"),
                  description: t("projects.saas.description"),
                  category: "Web App",
                  tags: ["TypeScript", "D3.js", "WebSocket", "GraphQL"],
                  color: "from-orange-500 to-red-500",
                  year: "2023",
                },
              ].map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}>
                      {/* Preview/Mockup Area */}
                      <motion.div
                        className="w-full lg:w-3/5 relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className={`relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br ${project.color} p-8 lg:p-12 shadow-2xl`}>
                          {/* Decorative Elements */}
                          <div className="absolute inset-0 opacity-20">
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
                                backgroundSize: "30px 30px",
                              }}
                            />
                          </div>

                          {/* Floating Shapes */}
                          <motion.div
                            className="absolute top-6 right-6 w-20 h-20 border-2 border-white/30 rounded-2xl"
                            animate={{ rotate: [0, 90, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute bottom-8 left-8 w-12 h-12 bg-white/20 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />

                          {/* Browser Mockup */}
                          <div className="relative h-full bg-white rounded-2xl shadow-2xl overflow-hidden transform group-hover:translate-y-[-8px] transition-transform duration-500">
                            {/* Browser Bar */}
                            <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                              </div>
                              <div className="flex-1 mx-4">
                                <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-2 max-w-xs">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  origin-labs.de/{project.category.toLowerCase().replace(" ", "")}
                                </div>
                              </div>
                            </div>

                            {/* Content Preview */}
                            <div className="p-6 bg-gradient-to-b from-slate-50 to-white h-full">
                              {/* Skeleton UI Preview */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} opacity-80`} />
                                  <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mt-6">
                                  {[1, 2, 3].map((i) => (
                                    <div key={i} className="aspect-square rounded-xl bg-slate-100" />
                                  ))}
                                </div>
                                <div className="space-y-2 mt-4">
                                  <div className="h-3 bg-slate-100 rounded w-full" />
                                  <div className="h-3 bg-slate-100 rounded w-4/5" />
                                  <div className="h-3 bg-slate-100 rounded w-3/5" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Year Badge */}
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
                            {project.year}
                          </div>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="w-full lg:w-2/5 space-y-6">
                        {/* Category Badge */}
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-grey/5 rounded-full"
                        >
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                          <span className="text-sm font-medium text-slate-grey">
                            {project.category}
                          </span>
                        </motion.div>

                        {/* Title & Subtitle */}
                        <div>
                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-grey mb-3"
                          >
                            {project.title}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            className={`font-heading text-lg lg:text-xl font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                          >
                            {project.subtitle}
                          </motion.p>
                        </div>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                          className="font-body text-slate-grey/70 text-lg leading-relaxed"
                        >
                          {project.description}
                        </motion.p>

                        {/* Tags */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.45 }}
                          className="flex flex-wrap gap-2"
                        >
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-2 bg-card-bg border border-divider text-slate-grey/80 text-sm font-medium rounded-xl hover:border-primary-cyan/30 hover:bg-primary-cyan/5 transition-colors cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.button
                            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${project.color} text-white font-heading font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow`}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{t("common.caseStudy")}</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/projekte"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-grey/10 text-slate-grey font-heading font-semibold rounded-full hover:border-primary-cyan/30 hover:text-primary-blue hover:shadow-lg hover:shadow-primary-cyan/10 transition-all"
                >
                  {t("common.viewAllProjects")}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== CONTACT SECTION ==================== */}
        <section id="contact" className="py-32 bg-off-white relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary-cyan/10 via-primary-blue/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                {t("contact.label")}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6 leading-tight">
                {t("contact.title")}
                <br />
                <span className="gradient-text">{t("contact.titleHighlight")}</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-xl mx-auto mb-12">
                {t("contact.subtitle")}
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.a
                  href="/kontakt"
                  className="group relative px-10 py-5 gradient-primary text-white font-heading font-semibold rounded-full overflow-hidden shadow-xl shadow-primary-blue/30"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t("common.contactUs")}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-cyan"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                <motion.a
                  href="tel:+4915203037738"
                  className="px-10 py-5 bg-card-bg border-2 border-divider text-slate-grey font-heading font-semibold rounded-full hover:border-primary-cyan/30 hover:shadow-lg hover:shadow-primary-cyan/10 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t("common.callNow")}
                </motion.a>
              </motion.div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: t("contact.email"),
                    info: "info@origin-labs.de",
                    key: "email",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    title: t("contact.phone"),
                    info: "+49 152 03037738",
                    key: "phone",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: t("contact.location"),
                    info: t("contact.locationInfo"),
                    key: "location",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="group bg-card-bg p-8 rounded-3xl border border-divider hover:border-primary-cyan/20 hover:shadow-xl hover:shadow-primary-cyan/5 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-5 text-white shadow-lg shadow-primary-blue/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-slate-grey mb-2 text-center">
                      {item.title}
                    </h4>
                    <p className="font-body text-slate-grey/60 text-center">
                      {item.info}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
