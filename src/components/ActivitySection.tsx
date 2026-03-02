import activity1 from "@/assets/activity-1.jpg";
import activity2 from "@/assets/activity-2.jpg";
import activity3 from "@/assets/activity-3.jpg";

interface Activity {
  image: string;
  title: string;
  location: string;
  date: string;
  status: "open" | "full";
}

const activities: Activity[] = [
  {
    image: activity1,
    title: "115年度環境知識競賽",
    location: "新竹縣政府大禮堂",
    date: "2026年5月20日",
    status: "open",
  },
  {
    image: activity2,
    title: "綠色生活節：親子嘉年華",
    location: "新竹縣立體育館",
    date: "2026年7月01日",
    status: "open",
  },
  {
    image: activity3,
    title: "南寮漁港減塑工作坊",
    location: "南寮漁港遊客中心",
    date: "2026年6月15日",
    status: "full",
  },
];

const ActivitySection = () => {
  return (
    <section id="activities">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">最新活動報名</h2>
          <p className="text-muted-foreground mt-1">
            優先完成：知識競賽、志工群英會線上報名
          </p>
        </div>
        <a href="#" className="text-primary font-medium hover:underline hidden md:block">
          查看全部 →
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {activities.map((a, i) => (
          <div
            key={a.title}
            className="bg-card rounded-3xl overflow-hidden border border-border hover:shadow-card-hover transition-all duration-500 group animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div
                className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-medium ${
                  a.status === "open"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground text-primary-foreground"
                }`}
              >
                {a.status === "open" ? "開放報名" : "額滿"}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-foreground">{a.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                地點：{a.location}
                <br />
                日期：{a.date}
              </p>
              <button
                disabled={a.status === "full"}
                className={`w-full py-3 rounded-xl font-bold transition-colors ${
                  a.status === "open"
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {a.status === "open" ? "立即報名" : "活動額滿"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySection;
