import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import MetaTags from "../components/MetaTags";

export default function Projects() {
  const { data: projects, isLoading: loading, error } = useProjects();

  if (loading) return <p className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">Loading...</p>;
  if (error) return <p className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">Error: {(error as Error).message}</p>;

  return (
    <>
      <MetaTags
        title="Projects - datheory Portfolio"
        description="Explore projects showcasing expertise in data science, machine learning, and fullstack development by datheory."
        path="/projects"
      />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10 text-white">Selected Projects</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {projects?.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              slug={project.slug}
              short_description={project.short_description}
              tech_stack={project.tech_stack}
            />
          ))}
        </div>
      </section>
    </>
  );
}
