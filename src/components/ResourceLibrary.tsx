import { FileText, Video, BookOpen } from "lucide-react";

const resources = [
  {
    icon: FileText,
    category: "教案設計",
    title: "水資源保育教案",
    desc: "適用國小高年級，含學習單與評量表",
    downloads: 342,
  },
  {
    icon: Video,
    category: "影音教材",
    title: "新竹縣濕地生態紀錄片",
    desc: "時長 25 分鐘，含導覽手冊",
    downloads: 518,
  },
  {
    icon: BookOpen,
    category: "學習單",
    title: "碳足跡計算工作坊手冊",
    desc: "互動式學習，適用企業 ESG 培訓",
    downloads: 189,
  },
  {
    icon: FileText,
    category: "教案設計",
    title: "在地植物辨識圖鑑",
    desc: "收錄新竹縣 120 種常見植物",
    downloads: 276,
  },
];

const ResourceLibrary = () => {
  return (
    <section id="resources">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">教材資源庫</h2>
          <p className="text-muted-foreground mt-1">精選教案、影片與互動教材</p>
        </div>
        <a href="#" className="text-primary font-medium hover:underline hidden md:block">
          瀏覽全部 →
        </a>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((r, i) => (
          <div
            key={r.title}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-card-hover transition-all duration-300 group animate-fade-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <r.icon size={20} />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{r.category}</span>
            <h3 className="text-base font-bold text-foreground mt-1 mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{r.desc}</p>
            <div className="flex items-center justify-end">
              <button className="text-xs font-semibold text-primary hover:underline">
                下載
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResourceLibrary;
