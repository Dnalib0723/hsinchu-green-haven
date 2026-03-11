import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "活動報名", href: "#activities" },
  { label: "教材資源", href: "#resources" },
  { label: "場域地圖", href: "#venues" },
  { label: "人才資源", href: "/talents" },
  { label: "案例分享", href: "#cases" },
  { label: "法規資訊", href: "#regulations" },
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
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#dashboard"
            className="px-5 py-2 bg-primary text-primary-foreground rounded-full hover:bg-forest-dark transition-colors font-semibold text-sm"
          >
            管理後台
          </a>
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
          <a
            href="#dashboard"
            className="block mt-2 text-center px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold"
          >
            管理後台
          </a>
        </div>
      )}
    </nav>
  );
};

export default SiteNavbar;
