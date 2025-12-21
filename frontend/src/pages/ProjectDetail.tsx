import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import MetaTags from "../components/MetaTags";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProject(slug ?? '');

  if (!slug) {
    return (
      <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Project slug not found</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <p className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">Loading...</p>;
  if (error) return <p className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">Error: {(error as Error).message}</p>;

  if (!project) {
    return (
      <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaTags
        title={`${project.title} - datheory Portfolio`}
        description={project.description}
        path={`/projects/${project.slug}`}
      />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4 text-white">{project.title}</h1>

        <p className="text-slate-400 mb-6">
          {project.description}
        </p>

        <div className="flex gap-4 mb-8">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              GitHub
            </a>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              Live Demo
            </a>
          )}
        </div>

        <div className="prose prose-invert max-w-none bg-slate-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Project Details</h2>
          <p>{project.description}</p>
        </div>
      </section>
    </>
  );
}
