import { MapPin } from "lucide-react";

const venues = [
  { name: "新竹縣自然谷環境信託", district: "芎林鄉", type: "森林生態" },
  { name: "金漢柿餅文化園區", district: "新埔鎮", type: "農業文化" },
  { name: "綠世界生態農場", district: "北埔鄉", type: "生態教育" },
  { name: "內灣老街生態步道", district: "橫山鄉", type: "步道導覽" },
  { name: "新豐紅樹林生態區", district: "新豐鄉", type: "濕地生態" },
  { name: "頭前溪生態教育園區", district: "竹北市", type: "河川生態" },
];

const VenueMap = () => {
  return (
    <section id="venues">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">認證環教場域</h2>
        <p className="text-muted-foreground mt-1">探索新竹縣優質環境教育場所</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Map placeholder */}
        <div className="bg-muted rounded-2xl p-8 flex items-center justify-center min-h-[320px] border border-border">
          <div className="text-center text-muted-foreground">
            <MapPin size={48} className="mx-auto mb-4 text-primary opacity-50" />
            <p className="font-medium text-foreground">互動式地圖</p>
            <p className="text-sm mt-1">整合 56 處認證環教場域</p>
          </div>
        </div>
        {/* Venue list */}
        <div className="space-y-3">
          {venues.map((v) => (
            <div
              key={v.name}
              className="bg-card rounded-xl p-4 border border-border hover:shadow-card-hover transition-all duration-300 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                <MapPin size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground text-sm">{v.name}</div>
                <div className="text-xs text-muted-foreground">{v.district}</div>
              </div>
              <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full shrink-0">
                {v.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueMap;
