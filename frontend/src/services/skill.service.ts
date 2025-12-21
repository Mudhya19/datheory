import { api } from './api';
import type { Skill, ApiResponse } from '../types';

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get<ApiResponse<Skill[]>>('/skills');
  return response.data.data;
};
