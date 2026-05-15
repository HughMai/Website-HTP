"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE, type NavId } from "@/lib/site-data";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<NavId>("trang-chu");
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  React.useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.id)
    ).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (visible?.target.id) setActive(visible.target.id as NavId);
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpen(false);
      }
    } else {
      router.push(`/#${id}`);
      setOpen(false);
    }
  };

  const primaryHotline = SITE.hotlines[0];

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled
          ? "glass border-b border-brand/10 shadow-[0_6px_24px_-12px_rgba(10,37,64,0.18)]"
          : "bg-brand/35 border-b border-white/10"
      )}
      aria-label="Thanh điều hướng chính"
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            scrolled
              ? "focus-visible:ring-brand"
              : "focus-visible:ring-white focus-visible:ring-offset-brand"
          )}
          aria-label="Về trang chủ"
        >
          <span className="inline-flex items-center rounded-full bg-brand p-1 shadow-sm transition-all">
            <Image
              src="/logo.svg"
              alt={`${SITE.brand} — Logo`}
              width={44}
              height={44}
              priority
              className="h-10 w-10 md:h-11 md:w-11"
            />
          </span>
          <span className="flex flex-col text-left leading-tight">
            <span
              className={cn(
                "text-xs font-bold tracking-tight transition-colors md:text-sm",
                scrolled ? "text-brand" : "text-white"
              )}
            >
              {SITE.brand}
            </span>
            <span
              className={cn(
                "hidden text-[10px] font-medium uppercase tracking-[0.14em] transition-colors md:block",
                scrolled ? "text-brand/55" : "text-white/65"
              )}
            >
              Bảo Vệ Ngôi Nhà Bạn
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Liên kết điều hướng"
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                  scrolled
                    ? isActive
                      ? "text-brand focus-visible:ring-brand"
                      : "text-brand/70 hover:text-brand focus-visible:ring-brand"
                    : isActive
                    ? "text-white focus-visible:ring-white focus-visible:ring-offset-brand"
                    : "text-white/75 hover:text-white focus-visible:ring-white focus-visible:ring-offset-brand"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full",
                      scrolled ? "bg-brand" : "bg-white"
                    )}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          <Link
            href="/sua-chua-cua-cuon-can-tho"
            className={cn(
              "relative rounded-md px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
              scrolled
                ? "text-brand/70 hover:text-brand focus-visible:ring-brand"
                : "text-white/75 hover:text-white focus-visible:ring-white focus-visible:ring-offset-brand"
            )}
          >
            Sửa Chữa
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              !scrolled &&
                "border border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand"
            )}
            aria-label={`Gọi hotline ${primaryHotline}`}
          >
            <a href={`tel:${primaryHotline.replace(/\s/g, "")}`}>
              <Phone className="h-4 w-4" aria-hidden />
              {primaryHotline}
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "lg:hidden",
                  !scrolled &&
                    "border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand"
                )}
                aria-label="Mở menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>{SITE.brand}</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  {SITE.tagline}
                </p>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 pb-6">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <SheetClose key={link.id} asChild>
                      <button
                        onClick={() => handleNav(link.id)}
                        className={cn(
                          "rounded-lg px-4 py-3 text-left text-base font-medium transition-colors",
                          isActive
                            ? "bg-brand text-white"
                            : "text-brand hover:bg-brand-50"
                        )}
                      >
                        {link.label}
                      </button>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Link
                    href="/sua-chua-cua-cuon-can-tho"
                    className="rounded-lg px-4 py-3 text-left text-base font-medium text-brand transition-colors hover:bg-brand-50"
                  >
                    Sửa Chữa
                  </Link>
                </SheetClose>
                <div className="mt-4 grid gap-2">
                  {SITE.hotlines.map((h) => (
                    <a
                      key={h}
                      href={`tel:${h.replace(/\s/g, "")}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-base font-semibold text-white hover:bg-brand-600"
                      aria-label={`Gọi hotline ${h}`}
                    >
                      <Phone className="h-4 w-4" />
                      {h}
                    </a>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
