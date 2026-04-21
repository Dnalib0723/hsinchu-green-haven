const stats = [
  { value: "1,248", label: "活動報名人數" },
  { value: "56", label: "認證場域數" },
  { value: "1,705", label: "活躍志工人數" },
];

const volunteerData = [
  { label: "新豐鄉", count: 444 },
  { label: "竹北市", count: 210 },
  { label: "竹東鎮", count: 204 },
  { label: "湖口鄉", count: 324 },
  { label: "北埔鄉", count: 193 },
  { label: "橫山鄉", count: 108 },
  { label: "芎林鄉", count: 69 },
  { label: "峨眉鄉", count: 68 },
  { label: "新埔鎮", count: 60 },
  { label: "關西鎮", count: 25 },
];

const maxCount = Math.max(...volunteerData.map((d) => d.count));
const bars = volunteerData.map((d) => ({
  label: d.label,
  count: d.count,
  pct: Math.round((d.count / maxCount) * 100),
}));

const DashboardSection = () => {
  return (
    <section id="dashboard" className="bg-dashboard rounded-3xl p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
            數位化決策支援
          </h2>
          <p className="text-primary-foreground/60 mb-8 leading-relaxed">
            115年度建立核心資料基礎，實現數據化管理。讓管理單位一眼看出新竹縣各行政區的環教能量與民眾參與熱度。
          </p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="bg-primary-foreground/5 border border-primary-foreground/10 p-5 rounded-2xl animate-count-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-forest-light">
                  {s.value}
                </div>
                <div className="text-sm text-primary-foreground/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary-foreground/5 rounded-2xl p-6 border border-primary-foreground/10">
          <div className="flex items-end gap-3 h-44">
            {bars.map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                <span className="text-[9px] text-primary-foreground/50">{b.count}</span>
                <div
                  className="w-full bg-forest-light rounded-t-md transition-all duration-700"
                  style={{ height: `${b.pct}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-primary-foreground/40 mt-3 px-0.5">
            {bars.map((b) => (
              <span key={b.label}>{b.label}</span>
            ))}
          </div>
          <p className="text-center text-xs text-primary-foreground/40 mt-6">
            各鄉鎮志工人數統計
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
