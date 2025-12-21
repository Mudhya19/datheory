import { useQuery } from '@tanstack/react-query';
import { getProjectBySlug } from '../services/project.service';

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: !!slug,
  });
};
