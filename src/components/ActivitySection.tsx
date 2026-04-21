import activity1 from "@/assets/activity-1.jpg";
import activity2 from "@/assets/activity-2.jpg";
import activity3 from "@/assets/activity-3.jpg";

interface Activity {
  image: string;
  title: string;
  location: string;
  date: string;
  status: "open" | "full";
  formUrl?: string;
  feedbackUrl?: string;
}

const activities: Activity[] = [
  {
    image: activity1,
    title: "廢木變黃金:森林循環與資材重生",
    location: "木酢達人-REWOOD森林循環碳經濟創生有限公司",
    date: "2026年3月19日(星期四) 13:30-16:30",
    status: "full",
    feedbackUrl: "#",
  },
  {
    image: activity2,
    title: "奇妙水旅程：水資源循環再生與環境保護",
    location: "竹北水資源回收中心",
    date: "2026年3月24日(星期二) 13:30-16:30",
    status: "full",
    feedbackUrl: "#",
  },
  {
    image: activity3,
    title: "可食綠地景:九芎湖自然資材應用與導覽",
    location: "九芎湖環境教育園區",
    date: "2026年3月26日(星期四) 13:30-16:30",
    status: "full",
    feedbackUrl: "#",
  },
];

const ActivitySection = () => {
  return (
    <section id="activities" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              最新活動報名
            </h2>
            <p className="text-muted-foreground mt-1">
              優先完成：知識競賽、志工群英會線上報名
            </p>
          </div>
          <a
            href="#"
            className="text-primary font-medium hover:underline hidden md:block"
          >
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
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {a.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  地點：{a.location}
                  <br />
                  日期：{a.date}
                </p>

                <div className="flex gap-2">
                  {a.status === "open" && a.formUrl ? (
                    <a
                      href={a.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl font-bold text-center bg-foreground text-background hover:bg-foreground/90 transition-colors"
                    >
                      立即報名
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-3 rounded-xl font-bold bg-muted text-muted-foreground cursor-not-allowed"
                    >
                      活動額滿
                    </button>
                  )}
                  <a
                    href={a.feedbackUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl font-bold text-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    回饋反映
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
