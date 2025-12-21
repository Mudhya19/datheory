import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <h3 className="text-lg text-gray-600 mt-1">{profile.title}</h3>
      <p className="mt-3 text-gray-700">{profile.bio}</p>
      <div className="mt-4">
        <p className="text-sm"><span className="font-medium">Email:</span> {profile.contact.email}</p>
        {profile.contact.phone && <p className="text-sm"><span className="font-medium">Phone:</span> {profile.contact.phone}</p>}
      </div>
      {profile.links.website && (
        <a
          href={profile.links.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
        >
          Website
        </a>
      )}
    </div>
  );
}
