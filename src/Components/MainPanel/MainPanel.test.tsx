import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPanel from './MainPanel';
import { Album } from '../../types';

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

test('fetches data on button click', async () => {
    render(<MainPanel />);

    act(() => {
        const buttonElement = screen.getByText("Fetch");
        buttonElement.click();
    });

    const resultsElement = await screen.findByText("Loading");
    expect(resultsElement).toBeInTheDocument();
});

test('mocks fetch call', async () => {

    const albums: Album[] = [
        { userId: 1, id: 1, title: "Album 1" },
        { userId: 1, id: 2, title: "Album 2" }
    ] 

    const mockData = albums;
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData)
    } as any);

    render(<MainPanel />);

    act(() => {
        const buttonElement = screen.getByText("Fetch");
        buttonElement.click();
    });

    const resultsElement = await screen.findByText("Album 1");
    expect(resultsElement).toBeInTheDocument();
});