import { SkillFilterProvider } from "@/features/skill-filter";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Projects } from "@/sections/projects";
import { Research } from "@/sections/research";
import { Experience } from "@/sections/experience";
import { Services } from "@/sections/services";
import { Contact } from "@/sections/contact";

export default function Page() {
  return (
    <SkillFilterProvider>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Experience />
      <Services />
      <Contact />
    </SkillFilterProvider>
  );
}
