import { useProfile } from "../hooks/useProfile";
import MetaTags from "../components/MetaTags";

export default function About() {
  const { profile, loading, error } = useProfile();

  if (loading) return <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">Loading profile...</div>;

  if (error) return <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">Error: {error}</div>;

  if (!profile) return <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">No profile found</div>;

  return (
    <>
      <MetaTags
        title="About Datheory - Data Science & Machine Learning Professional"
        description="Learn more about Datheory, a data science and machine learning professional with expertise in building data-driven solutions."
        path="/about"
      />
      <div className="p-10 text-white bg-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-500"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{profile.full_name}</h1>
              <h2 className="text-2xl text-slate-300 mb-4">{profile.title}</h2>
              <p className="text-lg text-slate-400">{profile.location}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg leading-relaxed">{profile.bio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                {profile.contact.email && (
                  <li className="flex items-center">
                    <span className="w-32 text-slate-400">Email:</span>
                    <a href={`mailto:${profile.contact.email}`} className="hover:text-blue-400">{profile.contact.email}</a>
                  </li>
                )}
                {profile.contact.phone && (
                  <li className="flex items-center">
                    <span className="w-32 text-slate-400">Phone:</span>
                    <a href={`tel:${profile.contact.phone}`} className="hover:text-blue-400">{profile.contact.phone}</a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                {profile.links.website && (
                  <li className="flex items-center">
                    <span className="w-32 text-slate-400">Website:</span>
                    <a href={profile.links.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">{profile.links.website}</a>
                  </li>
                )}
                {profile.social_links.github && (
                  <li className="flex items-center">
                    <span className="w-32 text-slate-400">GitHub:</span>
                    <a href={profile.social_links.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-40">GitHub Profile</a>
                  </li>
                )}
                {profile.social_links.linkedin && (
                  <li className="flex items-center">
                    <span className="w-32 text-slate-400">LinkedIn:</span>
                    <a href={profile.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-40">LinkedIn Profile</a>
                  </li>
                )}
                {profile.social_links.twitter && (
                  <li className="flex items-center">
                    <span className="w-32 text-slate-400">Twitter:</span>
                    <a href={profile.social_links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-40">Twitter Profile</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
