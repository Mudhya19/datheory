import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  slug: string;
  short_description: string;
  tech_stack?: string[];
}

export default function ProjectCard({ title, slug, short_description, tech_stack }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
      className="project-card"
    >
      <h3 className="text-lg font-semibold mb-2 text-white">
        {title}
      </h3>

      <p className="text-sm text-slate-400 mb-3">
        {short_description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech_stack?.map((tech, i) => (
          <span
            key={i}
            className="text-xs bg-slate-700 px-2 py-1 rounded text-white"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
