import { useEffect, useState } from "react";
import { ProjectService } from "../services/project.service";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Skeleton loader component for better loading experience
  const SkeletonCard = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden animate-pulse" aria-busy="true" aria-label="Loading project card">
      <div className="p-6 h-full flex flex-col">
        <div className="mb-4 bg-gray-700/50 rounded-lg aspect-video flex items-center justify-center h-48">
          <div className="h-12 w-12 text-gray-500 text-center">
            <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex-grow">
          <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded mb-4 w-4/6"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-14 bg-gray-700 rounded-full"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );

  useEffect(() => {
    ProjectService.getAll()
      .then((res) => {
        // Debugging to ensure we see what we get
        console.log("Projects API response:", res.data);
        const data = res.data.data || [];

        if (Array.isArray(data)) {
            setProjects(data);
        } else if (data.data && Array.isArray(data.data)) {
             // Handle potential double wrapping if backend changes
             setProjects(data.data);
        } else {
             console.error("Unexpected data format:", data);
             setProjects([]);
             setError('Received invalid data format from server.');
        }
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div>
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My Projects</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my latest work and see how I bring ideas to life through code
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My Projects</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my latest work and see how I bring ideas to life through code
          </p>
        </div>

        <div className="text-center py-12">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <p className="text-gray-500 mb-6">We're sorry, but something went wrong while loading the projects.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            Retry Loading Projects
          </button>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div>
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My Projects</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my latest work and see how I bring ideas to life through code
          </p>
        </div>

        <div className="text-center py-12">
          <div className="text-gray-400 text-xl mb-4">No projects found</div>
          <p className="text-gray-500">Check back later for new projects!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My Projects</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore my latest work and see how I bring ideas to life through code
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Projects grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
