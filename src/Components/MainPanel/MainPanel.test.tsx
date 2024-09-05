import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPanel from './MainPanel';

test('renders main panel text', () => {
    render(<MainPanel />);
    const textElement = screen.getByTestId("main-panel-text");
    expect(textElement).toBeInTheDocument();
});