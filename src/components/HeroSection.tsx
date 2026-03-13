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
      </div>

      <div className="relative z-10 py-40 md:py-64 px-4"></div>
    </header>
  );
};

export default HeroSection;
