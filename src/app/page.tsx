import BannerHero from "@/components/BannerHero";
import EducationCard from "@/components/EducationCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProfileCard from "@/components/ProfileCard";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import SkillsCard from "@/components/SkillsCard";
import SunburstDivider from "@/components/SunburstDivider";

export default function Home() {
  return (
    <div data-testid="home-root">
      <SiteNav />
      <main className="max-w-editorial mx-auto px-6 py-12">
        <BannerHero />
        <SunburstDivider />
        <section id="profile" className="py-24">
          <ProfileCard />
        </section>
        <SunburstDivider />
        <section id="skills" className="py-24">
          <SkillsCard />
        </section>
        <SunburstDivider />
        <section id="experience" className="py-24">
          <ExperienceTimeline />
        </section>
        <SunburstDivider />
        <section id="education" className="py-24">
          <EducationCard />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
