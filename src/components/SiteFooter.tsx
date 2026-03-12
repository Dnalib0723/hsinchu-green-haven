import { Facebook, Instagram, MessageCircle } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="新竹縣環境教育資訊網 Logo"
                className="w-8 h-8 object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
              <span className="font-bold text-primary">新竹縣環境教育資訊網</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              新竹縣環境保護局
              <br />
              地址：302 新竹縣竹北市光明六路10號
              <br />
              電話：(03) 551-9345
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">快速連結</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#activities" className="hover:text-primary transition-colors">活動報名</a></li>
              <li><a href="#resources" className="hover:text-primary transition-colors">教材資源庫</a></li>
              <li><a href="#venues" className="hover:text-primary transition-colors">認證場域</a></li>
              <li><a href="#dashboard" className="hover:text-primary transition-colors">數據儀表板</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">關注我們</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LINE"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          © 2026 新竹縣環境保護局 — 環境教育資訊整合平台
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
