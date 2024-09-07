import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPanel from './MainPanel';

test('renders main panel text', () => {
    render(<MainPanel />);
    const textElement = screen.getByTestId("main-panel-text");
    expect(textElement).toBeInTheDocument();
});

test('renders buttons', () => {
    render(<MainPanel />);
    const fetchButton = screen.getByRole('button', { name: /fetch/i });
    const openModalButton = screen.getByRole('button', { name: /add project/i });
    const aboutMeButton = screen.getByRole('button', { name: /about me/i });

    expect(fetchButton).toBeInTheDocument();
    expect(openModalButton).toBeInTheDocument();
    expect(aboutMeButton).toBeInTheDocument();
});

test('renders no projects message', () => {
    render(<MainPanel />);
    const noProjectsElement = screen.getByText("No projects");
    expect(noProjectsElement).toBeInTheDocument();
});

test('calls refetchProjects when fetch button is clicked', async () => {
    const project = { id: 1, description: 'Project A' };
    // Spy on fetchProjects and mock its implementation for this test
    const fetchProjectsMock = jest.spyOn(require('api/project'), 'fetchProjects').mockResolvedValueOnce([project]);

    render(<MainPanel />);

    const fetchButton = screen.getByRole('button', { name: /fetch/i });

    await act(async () => {
        fetchButton.click();
    });

    expect(fetchProjectsMock).toHaveBeenCalledTimes(2);

    fetchProjectsMock.mockRestore();
});

test('opens modal when add project button is clicked', () => {
    render(<MainPanel />);
    const openModalButton = screen.getByRole('button', { name: /add project/i });

    act(() => {
        openModalButton.click();
    });

    const modalElement = screen.getByTestId("add-project");
    expect(modalElement).toBeInTheDocument();
});

test('opens about me modal when about me button is clicked', () => {
    render(<MainPanel />);
    const aboutMeButton = screen.getByRole('button', { name: /about me/i });

    act(() => {
        aboutMeButton.click();
    });

    const modalElement = screen.getByTestId("about-me");
    expect(modalElement).toBeInTheDocument();
});