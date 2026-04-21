import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "活動報名", href: "#activities" },
  { label: "成果分享", href: "#showcase" },
  { label: "教材資源", href: "#resources" },
  { label: "場域地圖", href: "#venues" },
  { label: "人才資源", href: "#volunteers" },
  { label: "綠色辦公", href: "#green-office" },
  { label: "法規資訊", href: "https://www.ema.gov.tw/information-service/laws-and-regulations/ema-laws/1775.html", external: true },
];

const SiteNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-card/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="新竹縣環境教育資訊網 Logo"
            className="w-9 h-9 object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
          <span className="text-lg font-bold text-primary tracking-tight">
            新竹縣環境教育資訊網
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default SiteNavbar;
