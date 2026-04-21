const videos = [
  { id: "6SG_wwqspUw", title: "活動成果紀錄 1" },
  { id: "Qo0aOTGBjZg", title: "活動成果紀錄 2" },
  { id: "3czCfYlmp04", title: "活動成果紀錄 3" },
  { id: "8c8u64x7OCY", title: "活動成果紀錄 4" },
  { id: "mDrhPffr1qs", title: "活動成果紀錄 5" },
];

const ActivityShowcase = () => {
  return (
    <section id="showcase">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">活動成果展示</h2>
          <p className="text-muted-foreground mt-1">回顧精彩活動現場與學員體驗</p>
        </div>
      </div>

      {/* 6 欄 grid，每部影片佔 2 欄，下排 2 部置中 */}
      <div className="grid grid-cols-6 gap-4">
        {videos.slice(0, 3).map((v, i) => (
          <div
            key={v.id}
            className="col-span-6 sm:col-span-2 rounded-2xl overflow-hidden border border-border shadow-sm animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        ))}
        <div
          className="col-span-6 sm:col-span-2 sm:col-start-2 rounded-2xl overflow-hidden border border-border shadow-sm animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${videos[3].id}`}
              title={videos[3].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <div
          className="col-span-6 sm:col-span-2 rounded-2xl overflow-hidden border border-border shadow-sm animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${videos[4].id}`}
              title={videos[4].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityShowcase;
