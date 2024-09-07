import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectPanel from './ProjectPanel';


test('renders project description', () => {
    const project = { id: 1, description: 'Project A' };
    render(<ProjectPanel project={project} refreshProjects={() => {}} />);
    const descriptionElement = screen.getByText("Project A");
    expect(descriptionElement).toBeInTheDocument();
});

test('calls refreshProjects on click', async () => {
    const project = { id: 1, description: 'Project A' };
    const refreshProjects = jest.fn();
    
    const deleteProjectMock = jest.spyOn(require('api/project'), 'deleteProject').mockResolvedValueOnce(null);

    render(<ProjectPanel project={project} refreshProjects={refreshProjects} />);
    const descriptionElement = screen.getByText('Project A');

    await act(async () => {
        descriptionElement.click();
    });

    expect(deleteProjectMock).toHaveBeenCalledWith(1);
    expect(refreshProjects).toHaveBeenCalledTimes(1);

    // Restore the original function after the test
    deleteProjectMock.mockRestore();
});