import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectService } from "../services/project.service";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    ProjectService.getBySlug(slug)
      .then((res) => {
        setProject(res.data.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Project Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-gray-700 rounded mb-4 w-3/4 animate-pulse" aria-hidden="true"></div>
          <div className="h-6 bg-gray-700 rounded w-full animate-pulse" aria-hidden="true"></div>
        </div>

        {/* Project Image Skeleton */}
        <div className="mb-8 bg-gray-800 rounded-xl overflow-hidden aspect-video flex items-center justify-center" aria-hidden="true">
          <div className="h-full w-full bg-gray-700 animate-pulse"></div>
        </div>

        {/* Project Details Skeleton */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700" aria-hidden="true">
            <div className="h-5 bg-gray-700 rounded mb-4 w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700" aria-hidden="true">
            <div className="h-5 bg-gray-700 rounded mb-4 w-1/2 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700" aria-hidden="true">
            <div className="h-5 bg-gray-700 rounded mb-4 w-1/2 animate-pulse"></div>
            <div className="flex flex-col gap-2">
              <div className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Project Description Skeleton */}
        <div className="mb-8" aria-hidden="true">
          <div className="h-8 bg-gray-700 rounded mb-4 w-1/3 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6 animate-pulse"></div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg opacity-50">
            <div className="w-5 h-5 mr-2"></div>
            Back to Projects
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Details</h1>
          <p className="text-gray-400 text-lg">Something went wrong while loading this project</p>
        </div>

        <div className="text-center py-12" role="alert" aria-live="polite">
          <div className="text-red-400 text-xl mb-4" role="alert">{error}</div>
          <p className="text-gray-500 mb-6">We're sorry, but something went wrong while loading the project details.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-green-50/20 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              aria-label="Retry loading project"
            >
              Retry Loading Project
            </button>
            <Link
              to="/projects"
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              aria-label="Go back to projects page"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Details</h1>
          <p className="text-gray-400 text-lg">Project not found</p>
        </div>

        <div className="text-center py-12">
          <div className="text-gray-400 text-xl mb-4">Project not found</div>
          <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or may have been removed.</p>
          <Link
            to="/projects"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-green-50/20 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            aria-label="Browse all projects"
          >
            Browse All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" tabIndex="-1" id="project-title">{project.title}</h1>
        <p className="text-gray-400 text-lg" id="project-description">{project.short_description}</p>
      </div>

      {/* Project Image Placeholder */}
      <div className="mb-8 bg-gray-800 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2">Project screenshot/image</p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Project Details</h3>
            <p className="text-gray-300">
              <span className="block">Duration: {project.duration || 'N/A'}</span>
              <span className="block mt-1">Category: {project.category || 'N/A'}</span>
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack?.split(',').map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                  {tech.trim()}
                </span>
              )) || <span className="text-gray-500">N/A</span>}
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Links</h3>
            <div className="flex flex-col gap-2">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Project Description</h2>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line" tabIndex="0" aria-label={`Project description: ${project.description}`}>
            {project.description}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-green-50/20 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
