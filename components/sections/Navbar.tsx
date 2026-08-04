"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, Phone } from "lucide-react";
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
import { MAIN_NAV, SITE } from "@/lib/site-data";

type NavItem = (typeof MAIN_NAV)[number];

function hasChildren(
  item: NavItem
): item is Extract<NavItem, { children: readonly unknown[] }> {
  return "children" in item;
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close any open dropdown when the route changes
  React.useEffect(() => {
    setOpenMenu(null);
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && href !== "/#lien-he";

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
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="container flex h-16 items-center justify-between gap-3 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
              Cần Thơ · Từ {SITE.foundedYear}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Liên kết điều hướng"
        >
          {MAIN_NAV.map((item) => {
            const active = isActive(item.href);
            const itemClass = cn(
              "relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
              scrolled
                ? active
                  ? "text-brand focus-visible:ring-brand"
                  : "text-brand/70 hover:text-brand focus-visible:ring-brand"
                : active
                ? "text-white focus-visible:ring-white focus-visible:ring-offset-brand"
                : "text-white/75 hover:text-white focus-visible:ring-white focus-visible:ring-offset-brand"
            );

            if (!hasChildren(item)) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={itemClass}
                  onMouseEnter={() => setOpenMenu(null)}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full",
                        scrolled ? "bg-amber-400" : "bg-amber-400"
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            }

            const isOpen = openMenu === item.label;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
              >
                <Link
                  href={item.href}
                  className={itemClass}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-amber-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full min-w-[248px] pt-2"
                  >
                    <ul className="overflow-hidden rounded-xl border border-brand/10 bg-white p-1.5 shadow-[0_18px_40px_-16px_rgba(10,37,64,0.35)]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand/80 transition-colors hover:bg-brand-50 hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              scrolled
                ? "bg-amber-400 text-brand hover:bg-amber-300"
                : "border border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand"
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
            <SheetContent
              side="right"
              className="flex w-[86vw] max-w-sm flex-col overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>{SITE.brand}</SheetTitle>
                <p className="text-sm text-muted-foreground">{SITE.tagline}</p>
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-1 px-3 pb-4">
                {MAIN_NAV.map((item) => (
                  <div key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-lg px-4 py-3 text-left text-base font-semibold transition-colors",
                          isActive(item.href)
                            ? "bg-brand text-white"
                            : "text-brand hover:bg-brand-50"
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                    {hasChildren(item) && (
                      <ul className="mb-1 ml-3 border-l border-brand/15 pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <SheetClose asChild>
                              <Link
                                href={child.href}
                                className="block rounded-lg px-3 py-2 text-sm text-brand/70 transition-colors hover:bg-brand-50 hover:text-brand"
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>

              <div className="sticky bottom-0 grid gap-2 border-t border-brand/10 bg-white px-3 py-4">
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
