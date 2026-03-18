import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";

function TrueFuelLogo() {
  return (
    <svg viewBox="0 0 150 28" aria-label="TrueFuel" className="h-6 w-auto" fill="none">
      {/* Mountain peak mark */}
      <path d="M4 24L12 4L16 14L20 8L26 24" 
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 24L12 16L16 24" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      {/* Text */}
      <text x="32" y="20" fontFamily="'Cabinet Grotesk', 'Satoshi', sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">
        TrueFuel
      </text>
    </svg>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setDark(!dark)}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      data-testid="button-theme-toggle"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/how-to", label: "How to make gel" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/">
            <span className="cursor-pointer" data-testid="link-logo">
              <TrueFuelLogo />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm cursor-pointer transition-colors ${
                    location === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link href="/cart">
              <Button size="icon" variant="ghost" className="relative" data-testid="button-cart">
                <ShoppingCart className="w-4 h-4" />
                {cart.count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center" data-testid="text-cart-count">
                    {cart.count}
                  </span>
                )}
              </Button>
            </Link>
            {/* Mobile menu toggle */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border px-6 py-4 bg-background space-y-3" data-testid="nav-mobile">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block text-sm cursor-pointer py-1 ${
                    location === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-3 mb-8">
            <div>
              <TrueFuelLogo />
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Affordable, sustainable running nutrition. Made in Canada.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="/shop"><span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">All products</span></Link></li>
                <li><Link href="/product/gel-flask-150"><span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Gel flasks</span></Link></li>
                <li><Link href="/product/carb-mix-500"><span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Carb mix</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Learn</h4>
              <ul className="space-y-2">
                <li><Link href="/how-to"><span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">How to make your gel</span></Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 TrueFuel. All prices in CAD.
            </p>
            <PerplexityAttribution />
          </div>
        </div>
      </footer>
    </div>
  );
}
