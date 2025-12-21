export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string;
  tech_stack: string[];
  links: {
    github?: string;
    demo?: string;
  };
}
