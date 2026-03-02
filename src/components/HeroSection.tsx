import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="新竹縣自然景觀"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-75" />
      </div>

      <div className="relative z-10 py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-6 leading-tight animate-fade-up">
            看得到、找得到、用得到
          </h1>
          <p
            className="text-lg md:text-xl text-primary-foreground/90 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            整合人才、場域與教材三大核心資源
            <br />
            打造新竹縣唯一權威環境教育整合平台
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#activities"
              className="bg-card text-primary px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              探索環教活動
            </a>
            <a
              href="#resources"
              className="bg-forest-light/80 backdrop-blur text-primary-foreground border border-primary-foreground/20 px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-forest-light transition-all duration-300 hover:-translate-y-0.5"
            >
              下載數位教材
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
