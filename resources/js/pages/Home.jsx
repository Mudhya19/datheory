import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skills from "../components/Skills";
import { ProfileService } from "../services/profile.service";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    ProfileService.getProfile()
      .then(res => {
          console.log("Profile data:", res.data);
          setProfile(res.data.data);
      })
      .catch(err => console.error("Failed to load profile:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24" aria-labelledby="hero-title">
        <div className="mb-8">
          <h1 id="hero-title" className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Hi, I'm {profile?.full_name || 'Datheory'}
            <span className="block text-2xl md:text-4xl mt-4 text-white font-normal">
                {profile?.title || 'Data Science & Machine Learning Specialist'}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 whitespace-pre-line">
            {profile?.bio || 'Transforming raw data into actionable business insights'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/projects"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            View My Projects
          </Link>
          <a
            href={profile?.email ? `mailto:${profile.email}` : "#contact"}
            className="px-8 py-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Services/About Section */}
      <section className="py-12 border-t border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">About Me & Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {profile?.bio || 'I specialize in building end-to-end data solutions'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/30 transition-all duration-300">
            <div className="text-green-400 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Data Analysis</h3>
            <p className="text-gray-400">
              Exploring, cleaning, and analyzing datasets to uncover patterns and insights
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
            <div className="text-blue-400 text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">Machine Learning</h3>
            <p className="text-gray-400">
              Building predictive models and algorithms to solve complex problems
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <div className="text-purple-400 text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Web Integration</h3>
            <p className="text-gray-400">
              Integrating data solutions into web applications for analysis and decision-making
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
