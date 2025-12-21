interface SkillBadgeProps {
  name: string;
 category?: string;
  level?: string;
  icon?: string;
  proficiency?: number;
}

export default function SkillBadge({ name, level, icon, proficiency }: SkillBadgeProps) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg flex flex-col items-center">
      {icon && (
        <img
          src={icon}
          alt={name}
          className="w-12 h-12 mb-2 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name.toLowerCase()}/${name.toLowerCase()}-original.svg`;
          }}
        />
      )}
      <div className="text-center">
        <div className="font-medium">{name}</div>
        {level && <div className="text-xs text-slate-400 mt-1 capitalize">{level}</div>}
        {proficiency !== undefined && (
          <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${proficiency}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
