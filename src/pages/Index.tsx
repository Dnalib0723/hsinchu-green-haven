import SiteNavbar from "@/components/SiteNavbar";
import HeroSection from "@/components/HeroSection";
import AudienceCards from "@/components/AudienceCards";
import ActivitySection from "@/components/ActivitySection";
import ActivityShowcase from "@/components/ActivityShowcase";
import ResourceLibrary from "@/components/ResourceLibrary";
import VenueMap from "@/components/VenueMap";
import VolunteerMap from "@/components/VolunteerMap";
import GreenOfficeMap from "@/components/GreenOfficeMap";
import DashboardSection from "@/components/DashboardSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <HeroSection />
      <AudienceCards />
      <main className="max-w-7xl mx-auto py-20 px-4 space-y-24">
        <ActivitySection />
        <ActivityShowcase />
        <ResourceLibrary />
        <VenueMap />
        <VolunteerMap />
        <GreenOfficeMap />
        <DashboardSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
