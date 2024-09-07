    import React from 'react';
    import { Project } from '../../types';
    import { deleteProject } from 'api/project';
    import './ProjectPanel.scss';

    interface ProjectPanelProps {
        project: Project;
        refreshProjects: () => void;
    }

    const ProjectPanel: React.FC<ProjectPanelProps> = ({ project, refreshProjects }) => {
        const handleDeleteProject = async () => {
            try {
                await deleteProject(project.id);
                refreshProjects();
            } catch (error) {
                console.error("Error:", error);
            }
        };

        return (
            <div className={"project-row"} onClick={() => handleDeleteProject()}>{project.description} <span>X</span></div>
        );
    };

    export default ProjectPanel;