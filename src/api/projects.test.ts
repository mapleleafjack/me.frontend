import axios from 'axios';

import { Project } from '../types';
import { addProject, deleteProject, fetchProjects } from './project';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Project Service', () => {
  describe('fetchProjects', () => {
    it('should fetch projects successfully', async () => {
      // Mock the API response
      const mockProjects: Project[] = [
        { id: 1, description: 'Description A' },
        { id: 2, description: 'Description B' },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockProjects });

      // Call the function
      const result = await fetchProjects();

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith("http://me-backend-lb-1123215968.eu-west-1.elb.amazonaws.com/projects");
      expect(result).toEqual(mockProjects);
    });

    it('should handle errors while fetching projects', async () => {
      const mockError = new Error('Network Error');

      mockedAxios.get.mockRejectedValueOnce(mockError);

      // Assertions
      await expect(fetchProjects()).rejects.toThrow('Network Error');
    });
  });

  describe('addProject', () => {
    it('should add a new project successfully', async () => {
      const newProjectData = { name: 'New Project', description: 'New Project Description' };
      const mockCreatedProject: Project = { id: 3, ...newProjectData };

      mockedAxios.post.mockResolvedValueOnce({ data: mockCreatedProject });

      const result = await addProject(newProjectData);

      // Assertions
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://me-backend-lb-1123215968.eu-west-1.elb.amazonaws.com/projects",
        newProjectData,
        { headers: { "Content-Type": "application/json" } }
      );
      expect(result).toEqual(mockCreatedProject);
    });

    it('should handle errors while adding a new project', async () => {
      const mockError = new Error('Failed to add project');
      const newProjectData = { name: 'New Project', description: 'New Project Description' };

      mockedAxios.post.mockRejectedValueOnce(mockError);

      // Assertions
      await expect(addProject(newProjectData)).rejects.toThrow('Failed to add project');
    });
  });

  describe('deleteProject', () => {
    it('should delete a project successfully', async () => {
      const projectId = 1;

      await expect(deleteProject(projectId)).resolves.toBeUndefined();

      // Assertions
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `http://me-backend-lb-1123215968.eu-west-1.elb.amazonaws.com/projects/${projectId}`
      );
    });

    it('should handle errors while deleting a project', async () => {
      const mockError = new Error('Failed to delete project');
      const projectId = 1;

      mockedAxios.delete.mockRejectedValueOnce(mockError);

      // Assertions
      await expect(deleteProject(projectId)).rejects.toThrow('Failed to delete project');
    });
  });
});
