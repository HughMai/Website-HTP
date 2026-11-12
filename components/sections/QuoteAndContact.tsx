"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site-data";

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export function QuoteAndContact() {
  return (
    <section
      id="lien-he"
      aria-labelledby="contact-heading"
      className="relative bg-brand py-16 text-white md:py-20"
    >
      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 100% at 50% 100%,black 30%,transparent 80%)",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-8 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            Liên Hệ & Báo Giá
          </span>
          <h2
            id="contact-heading"
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            Để lại số — chúng tôi gọi lại trong 15 phút.
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {SITE.hotlines.map((hotline) => (
              <a
                key={hotline}
                href={`tel:${hotline.replace(/\s/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {hotline}
              </a>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/45">{SITE.workingHours}</p>
        </motion.div>

        {/* Panel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={1}
          className="mx-auto max-w-xl"
        >
          <div className="rounded-2xl bg-white text-brand shadow-2xl">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-brand">Yêu cầu báo giá miễn phí</h3>
              <p className="mt-1 text-sm text-brand/65">
                Ghi số Zalo để nhận báo giá &amp; catalog ngay lập tức:
              </p>
              <div className="mt-5">
                <LeadForm
                  source="Form báo giá chân trang chủ"
                  tone="light"
                  submitLabel="Nhận báo giá"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
