import { useProfile } from "../hooks/useProfile";
import { useSkills } from "../hooks/useSkills";
import { useProjects } from "../hooks/useProjects";
import MetaTags from "../components/MetaTags";
import SkillBadge from "../components/SkillBadge";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const { profile, loading: profileLoading, error: profileError } = useProfile();
 const { data: skills, isLoading: skillsLoading, error: skillsError } = useSkills();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();

 if (profileLoading || skillsLoading || projectsLoading) {
    return (
      <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (profileError || skillsError || projectsError) {
    return (
      <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Error loading data</p>
          <p className="mt-4 text-slate-400">Please check the console for more details</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No profile data found</p>
          <p className="mt-4 text-slate-400">Please check if the API is returning data correctly</p>
        </div>
      </div>
    );
  }

  // Get first 3 projects as featured projects
 const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <>
      <MetaTags
        title="Datheory - Data Science & Machine Learning Portfolio"
        description="Professional portfolio showcasing expertise in data science, machine learning, and fullstack development."
        path="/"
      />
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="p-10 max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto px-6 py-24">
            <h1 className="text-5xl font-bold leading-tight text-white">
              {profile.full_name}
            </h1>

            <p className="mt-4 text-xl text-slate-400 max-w-2xl">
              Data-Driven Full-Stack Developer specializing in
              <span className="text-emerald-400"> Data Science</span>,
              <span className="text-emerald-400"> Machine Learning</span>,
              and scalable web systems.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="/projects"
                className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded font-semibold text-white"
              >
                View Projects
              </a>

              <a
                href="/about"
                className="border border-slate-600 px-6 py-3 rounded hover:border-white text-white"
              >
                About Me
              </a>
            </div>
          </section>

          {/* Skills section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills?.map((skill) => (
                <SkillBadge
                  key={skill.id}
                  name={skill.name}
                  category={skill.category}
                  level={skill.level}
                  icon={skill.icon_url || skill.icon}
                  proficiency={skill.proficiency}
                />
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  slug={project.slug}
                  short_description={project.short_description}
                  tech_stack={project.tech_stack}
                />
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Have a project in mind? Feel free to reach out and let's create something amazing together.
            </p>
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
