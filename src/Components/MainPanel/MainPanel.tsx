import React from "react";
import './MainPanel.css';
import { fetchProjects } from "api/project";
import { Project } from "types";
import AddProjectWindow from "Components/AddProjectWindow/AddProjectWindow";
import ProjectPanel from "Components/ProjectPanel/ProjectPanel";

const MainPanel = () => {
    const [results, setResults] = React.useState<Project[] | null>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Function to refetch projects
    const refetchProjects = () => {
        fetchProjects().then((data) => {
            setResults(data);
        });
    };

    // Fetch projects on component mount
    React.useEffect(() => {
        refetchProjects();
    }, []);

    // Function to handle the closing of the modal
    const handleModalClose = () => {
        setIsModalOpen(false);
        refetchProjects(); // Refetch the results after adding a new project
    };

    return (
        <div className="main-panel">
            <h1>My Main Panel</h1>
            <p data-testid="main-panel-text">This is the main panel of my app.</p>
            
            <pre id="results">
                {results ? results.length > 0 ? (
                    results.map(project => (
                        <ProjectPanel key={project.id} project={project} refreshProjects={refetchProjects}/>
                    ))
                ) : "No projects" : "Loading"}
            </pre>

            {/* Corrected the Fetch button to call the refetchProjects function */}
            <button id="fetch-button" onClick={refetchProjects}>Fetch</button>
            <button id="open-modal-button" onClick={() => setIsModalOpen(true)}>Add Project</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <AddProjectWindow onClose={handleModalClose} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainPanel;
