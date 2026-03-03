import { Users, School, TreePine, HandHeart, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AudienceItem {
  icon: LucideIcon;
  label: string;
  sub: string;
  color: string;
}

const audiences: AudienceItem[] = [
  { icon: Users, label: "一般民眾", sub: "親子 / 休閒", color: "bg-sky-light text-sky" },
  { icon: School, label: "教師學校", sub: "備課 / 預約", color: "bg-wood-warm text-secondary-foreground" },
  { icon: TreePine, label: "場域機構", sub: "內容 / 數據", color: "bg-muted text-primary" },
  { icon: HandHeart, label: "志工社區", sub: "招募 / 時數", color: "bg-sky-light text-accent" },
  { icon: Building2, label: "企業機關", sub: "ESG / 辦公", color: "bg-secondary text-secondary-foreground" },
];

const AudienceCards = () => {
  return (
    <section className="max-w-7xl mx-auto -mt-12 px-4 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {audiences.map((a, i) => (
          <div
            key={a.label}
            className="bg-card p-6 rounded-2xl shadow-card text-center hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer group animate-fade-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div
              className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${a.color} group-hover:scale-110 transition-transform`}
            >
              <a.icon size={22} />
            </div>
            <div className="font-bold text-foreground">{a.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{a.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudienceCards;
