import { useEffect, useState } from "react";
import { SkillService } from "../services/skill.service";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    SkillService.getAll({ grouped: true })
      .then((res) => {
        // Backend returns { grouped_category_name: [skills...], ... } when grouped=true
        // Or we might just get a flat list. Let's handle both or stick to one.
        // The controller says: if ($request->boolean('grouped')) return $this->success(Skill::groupedByCategory());
        // Let's assume we want to show them grouped.
        // However, Skill::groupedByCategory might return a direct array or object.
        // Let's check the API response safe handling.
        console.log("Skills response:", res.data);
        const data = res.data.data || res.data;
        setSkills(data);
      })
      .catch((err) => {
        console.error("Error loading skills:", err);
        setError("Failed to load skills");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-8 text-gray-500">Loading skills...</div>;
  if (error) return null; // Hide section on error? Or show error.

  // If we get an object (grouped), render appropriately.
  // If array, render simple list.
  const isGrouped = !Array.isArray(skills) && typeof skills === 'object';

  if (!skills || (Array.isArray(skills) && skills.length === 0)) return null;

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Technical Skills</h2>

        {isGrouped ? (
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, categorySkills]) => (
              <div key={category} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 capitalize border-b border-gray-700 pb-2">
                  {category.replace('_', ' ')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map(skill => (
                    <div key={skill.id} className="group relative">
                        <span className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-all cursor-default">
                          {skill.name}
                        </span>
                        {/* Tooltip for proficiency if needed */}
                        {skill.proficiency > 0 && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-xs text-white px-2 py-1 rounded whitespace-nowrap">
                                {skill.proficiency}%
                            </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map(skill => (
              <span key={skill.id} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                {skill.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
