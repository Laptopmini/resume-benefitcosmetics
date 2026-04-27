import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Section from "@/components/Section";
import Skills from "@/components/Skills";

export default function Page() {
  return (
    <main data-testid="home">
      <Section id="hero" testId="section-hero">
        <Hero />
      </Section>
      <Section id="profile" testId="section-profile" title="Profile">
        <Profile />
      </Section>
      <Section id="skills" testId="section-skills" title="Skills">
        <Skills />
      </Section>
      <Section id="experience" testId="section-experience" title="Experience">
        <Experience />
      </Section>
      <Section id="education" testId="section-education" title="Education & Certifications">
        <Education />
      </Section>
    </main>
  );
}
