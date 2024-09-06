import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPanel from './MainPanel';
import { Project } from '../../types';

test('renders main panel text', () => {
    render(<MainPanel />);
    const textElement = screen.getByTestId("main-panel-text");
    expect(textElement).toBeInTheDocument();
});

test('renders fetch button', () => {
    render(<MainPanel />);
    const buttonElement = screen.getByText("Fetch");
    expect(buttonElement).toBeInTheDocument();
});
