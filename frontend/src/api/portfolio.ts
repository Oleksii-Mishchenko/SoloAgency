import { Portfolio, Project } from '../types/Project';
import { client } from '../utils/axiosClient';

const portfolioUrl = 'agency/portfolio/';

export const loadPortfolio = (params: string): Promise<Portfolio> => {
  return client.get<Portfolio>(portfolioUrl + params);
};

export const addProject = (data: FormData): Promise<Project> => {
  return client.post<Project, FormData>(portfolioUrl, data);
};
