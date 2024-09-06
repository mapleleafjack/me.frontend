import React from "react";
import './MainPanel.css';
import { Project } from "../../types";
import AddProjectWindow from "../AddProjectWindow/AddProjectWindow";


const MainPanel = () => {
    const [results, setResults] = React.useState<Project[] | null>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const fetchResults = async () => {
        setResults(null);
        try {
            const response = await fetch('http://me-backend-lb-1123215968.eu-west-1.elb.amazonaws.com/projects');
            const data: Project[] = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    React.useEffect(() => {
        fetchResults();
    }, []);

    // Function to handle the closing of the modal
     const handleModalClose = () => {
        setIsModalOpen(false);
        fetchResults(); // Refetch the results after adding a new project
    };

    return <div className="main-panel">
        <h1>My Main Panel</h1>
        <p data-testid="main-panel-text">This is the main panel of my app.</p>
        
        <pre id="results">
            {results ? results.length > 0 ? (
                results.map(project => (
                    <div key={project.id}>{project.description}</div>
                ))
            ) : "No projects" : "Loading"}
        </pre>

        <button id="fetch-button" onClick={fetchResults}>Fetch</button>
        <button id="open-modal-button" onClick={() => setIsModalOpen(true)}>Add Project</button> {/* Button to open the modal */}

        {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <AddProjectWindow onClose={handleModalClose} />
                    </div>
                </div>
            )}
    </div>
}

export default MainPanel;