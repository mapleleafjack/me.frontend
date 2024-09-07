import React from "react";
import './MainPanel.css';
import { fetchProjects } from "api/project";
import { Project } from "types";
import AddProjectWindow from "Components/AddProjectWindow/AddProjectWindow";
import ProjectPanel from "Components/ProjectPanel/ProjectPanel";

const MainPanel = () => {
    const [results, setResults] = React.useState<Project[] | null>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isAboutMeOpen, setIsAboutMeOpen] = React.useState(false);

    const refetchProjects = () => {
        fetchProjects().then((data) => {
            setResults(data);
        });
    };

    React.useEffect(() => {
        refetchProjects();
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false);
        refetchProjects(); 
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
            <button id="about-me-button" onClick={() => setIsAboutMeOpen(true)}>About Me</button>

            {isModalOpen && (
                <div className="modal" data-testid="add-project">
                    <div className="modal-content">
                        <AddProjectWindow onClose={handleModalClose} />
                    </div>
                </div>
            )}

            {isAboutMeOpen && (
                <div className="modal" data-testid="about-me">
                    <div className="modal-content">
                        <h2>About Me</h2>
                        <p>I am a software developer.</p>
                        <button onClick={() => setIsAboutMeOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainPanel;
