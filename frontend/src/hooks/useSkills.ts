import { useQuery } from '@tanstack/react-query';
import { getSkills } from '../services/skill.service';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });
};
