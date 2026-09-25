import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import abaLogo from "../assets/abatools-logo.png";
import qabaLogo from "../assets/qaba logo.png";

const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "من نحن" },
  { to: "/services", label: "الخدمات والاستشارات" },
  { to: "/courses", label: "الدورات" },
  { to: "/pricing", label: "التسجيل" },
  { to: "/resources", label: "الموارد الرقمية" },
  { to: "/shop", label: "المتجر" },
  { to: "/blog", label: "المدونة" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

const baseNavClasses =
  "flex-shrink-0 whitespace-nowrap rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-mint/15 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const activeNavClasses =
  "flex-shrink-0 whitespace-nowrap rounded-lg border border-mint/30 bg-mint/25 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-mint/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background">
      <div className="container-x flex h-14 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="AbaTools">
          <img src={abaLogo} alt="AbaTools" className="h-11 w-auto" width={160} height={44} />
          <span className="h-6 w-px bg-border" aria-hidden="true" />
          <img
            src={qabaLogo}
            alt="QABA — Certified"
            className="h-8 w-auto opacity-85"
            width={120}
            height={40}
          />
        </Link>

        <nav
          className="md:flex md:flex-1 md:items-center md:gap-1 lg:gap-2 md:overflow-x-auto md:hide-scrollbar hidden"
          aria-label="التنقل الرئيسي"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: activeNavClasses, "aria-current": "page" }}
              className={baseNavClasses}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            سجّل اهتمامك
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background">
          <nav className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary font-semibold", "aria-current": "page" }}
                className="py-3.5 text-sm font-medium text-foreground/80 border-b border-border/60 last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              سجّل اهتمامك
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
