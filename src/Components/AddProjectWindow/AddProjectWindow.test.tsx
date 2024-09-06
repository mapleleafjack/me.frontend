import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProjectWindow from './AddProjectWindow';
import { addProject } from '../../api/project';

// Mock the addProject API function
jest.mock('../../api/project', () => ({
  addProject: jest.fn(),
}));

describe('AddProjectWindow', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  test('renders AddProjectWindow component correctly', () => {
    render(<AddProjectWindow onClose={onCloseMock} />);
    
    // Check if title and input elements are in the document
    expect(screen.getByText('Add Project')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    render(<AddProjectWindow onClose={onCloseMock} />);
    
    const inputElement = screen.getByLabelText('Description:');
    
    // Simulate typing in the input field
    fireEvent.change(inputElement, { target: { value: 'New Project' } });
    
    // Assert input value is updated
    expect(inputElement).toHaveValue('New Project');
  });

  test('calls addProject API and onClose when form is submitted successfully', async () => {
    // Mock resolved value for addProject
    (addProject as jest.Mock).mockResolvedValueOnce({});

    render(<AddProjectWindow onClose={onCloseMock} />);

    const inputElement = screen.getByLabelText('Description:');
    const submitButton = screen.getByRole('button', { name: /add/i });

    // Simulate input change and form submission
    fireEvent.change(inputElement, { target: { value: 'New Project' } });
    fireEvent.click(submitButton);

    // Wait for onClose to be called
    await waitFor(() => expect(addProject).toHaveBeenCalledWith({ description: 'New Project' }));
    await waitFor(() => expect(onCloseMock).toHaveBeenCalled());
  });

  test('displays error message when addProject API fails', async () => {
    // Mock rejected value for addProject
    (addProject as jest.Mock).mockRejectedValueOnce(new Error('Failed to add project'));

    render(<AddProjectWindow onClose={onCloseMock} />);

    const inputElement = screen.getByLabelText('Description:');
    const submitButton = screen.getByRole('button', { name: /add/i });

    // Simulate input change and form submission
    fireEvent.change(inputElement, { target: { value: 'New Project' } });
    fireEvent.click(submitButton);

    // Wait for error message to be displayed
    await waitFor(() => expect(screen.queryByText('Failed to add project')).toBeInTheDocument());
    
    // Ensure onClose is not called
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
