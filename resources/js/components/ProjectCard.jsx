import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 transform hover:-translate-y-1 focus-within:border-gray-600 focus-within:shadow-xl focus-within:shadow-green-500/10 focus-within:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500/50">
      <div className="p-6 h-full flex flex-col">
        {/* Project Image Placeholder */}
        <div className="mb-4 bg-gray-700/50 rounded-lg aspect-video flex items-center justify-center h-48 cursor-pointer" role="img" aria-label={`Project image for ${project.title}`}>
          <div className="text-gray-500 text-center">
            <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 mb-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded">
            {project.title}
          </h3>

          <p className="text-gray-400 mb-4 line-clamp-3">
            {project.short_description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(Array.isArray(project.tech_stack) ? project.tech_stack : (project.tech_stack || '').split(','))
              .slice(0, 3)
              .map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs inline-block" aria-label={`Technology: ${tech.trim()}`}>
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-600/10 text-green-400 border border-green-500/30 rounded-lg hover:from-green-500/20 hover:to-blue-600/20 hover:border-green-500/50 hover:text-green-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
        >
          View Details
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
