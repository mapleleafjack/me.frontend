import axios from 'axios';

// Define the helper function for making the POST request
export const addProject = async (projectData: { description: string }) => {
    try {
        const response = await axios.post(
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
