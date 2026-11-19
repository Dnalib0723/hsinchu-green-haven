interface NewsItem {
  date: string;
  category: string;
  title: string;
  link: string;
}

// 新增消息：在陣列最上方加一筆即可（最新的放最前面）
const news: NewsItem[] = [
  {
    date: "2026-11-20",
    category: "公告訊息",
    title: "［賀］新竹縣國立竹東高中榮獲「臺美生態學校」銅牌認證！",
    link: "https://ecocampus.moenv.gov.tw/school/867",
  },
];

const NewsSection = () => {
  return (
    <section id="news">
      <h2 className="text-3xl font-bold text-foreground mb-8">最新消息</h2>
      <ul className="bg-card rounded-2xl shadow-card divide-y divide-border">
        {news.map((n) => (
          <li
            key={`${n.date}-${n.title}`}
            className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5 px-6 py-5"
          >
            <div className="flex items-center gap-4 shrink-0">
              <span className="w-1.5 h-6 bg-forest-dark rounded-sm" aria-hidden="true" />
              <time dateTime={n.date} className="font-bold text-foreground tabular-nums">
                {n.date}
              </time>
              <span className="bg-forest-dark text-primary-foreground text-sm font-medium px-3 py-1 rounded">
                {n.category}
              </span>
            </div>
            <a
              href={n.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary hover:underline transition-colors pl-[1.375rem] md:pl-0"
            >
              {n.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsSection;
