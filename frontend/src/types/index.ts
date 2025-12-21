export interface Profile {
  id: number;
  full_name: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar_url: string;
  avatar: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  links: {
    website: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  content: string;
  image_url: string;
  github_url: string;
  demo_url: string;
  tech_stack: string[];
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  proficiency: number;
  icon: string;
  icon_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}
