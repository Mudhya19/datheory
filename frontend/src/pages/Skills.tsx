import { useSkills } from "../hooks/useSkills";
import MetaTags from "../components/MetaTags";

export default function Skills() {
  const { data: skills, isLoading, error } = useSkills();

  if (isLoading) {
    return (
      <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <p>Loading skills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Error loading skills</p>
          <p className="mt-4 text-slate-400">Please check the console for more details</p>
        </div>
      </div>
    );
  }

  // Group skills by category
 const skillsByCategory: Record<string, typeof skills> = {};

  skills?.forEach(skill => {
    if (skill && skill.category) {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category]?.push(skill);
    }
  });

  return (
    <>
      <MetaTags
        title="Skills - datheory Portfolio"
        description="Technical skills and expertise in data science, machine learning, and fullstack development"
        path="/skills"
      />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8 text-white">Skills</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([group, items]) => (
            <div key={group}>
              <h3 className="font-semibold mb-3 text-white">{group}</h3>
              <ul className="space-y-1 text-slate-400">
                {items?.map(skill => (
                  <li key={skill.id} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
