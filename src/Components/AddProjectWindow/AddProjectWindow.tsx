import React, { useState } from "react";
import './AddProjectWindow.css';
import { addProject } from "../../api/project";

interface AddProjectWindowProps {
    onClose: () => void;
}

const AddProjectWindow: React.FC<AddProjectWindowProps> = ({ onClose }) => {
    const [description, setDescription] = useState("");
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const projectData = {
            description: description
        };

        try {
            await addProject(projectData); 
            console.log("Project added successfully!");

            onClose(); // Close the modal
        } catch (error) {
            console.error("Error:", error);
            setShowError(true);
        }
    };

    return (
        <div className="add-project-window">
            <h1>Add Project</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            {showError && <div className="error-message">Failed to add project</div>}
        </div>
    );
};

export default AddProjectWindow;
