import axios from 'axios';
import { Project } from 'types';

// Fetch projects function with specified return type
export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await axios.get<Project[]>(
            "http://me-backend-lb-1123215968.eu-west-1.elb.amazonaws.com/projects"
        );
        return response.data; // Return response data on success
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to handle it in the component
    }
}

// Add project function with specified parameter type
export const addProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    try {
        const response = await axios.post<Project>(
            "http://me-backend-lb-1123215968.eu-west-1.elb.amazonaws.com/projects",
            projectData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data; // Return response data on success
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};