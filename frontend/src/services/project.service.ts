import { api } from './api';
import type { Project, ApiResponse } from '../types';

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ApiResponse<Project[]>>('/projects');
  return response.data.data;
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await api.get<ApiResponse<Project>>(`/projects/${slug}`);
  return response.data.data;
};
