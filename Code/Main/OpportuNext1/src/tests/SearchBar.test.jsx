import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import "@testing-library/jest-dom";

// Set up a default fetch mock to return an empty result if not overridden
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [] }),
  })
);

const mockSuggestions = {
  results: [
    { job_id: '1', title: 'Software Engineer', company_title: 'Tech Corp', location: 'Remote' },
    { job_id: '2', title: 'Frontend Developer', company_title: 'Web Solutions', location: 'Dublin' },
    { job_id: '3', title: 'Backend Developer', company_title: 'Server Tech', location: 'Remote' },
    { job_id: '4', title: 'Data Scientist', company_title: 'Data Corp', location: 'New York' },
    { job_id: '5', title: 'UX Designer', company_title: 'Design Inc', location: 'San Francisco' },
    { job_id: '6', title: 'DevOps Engineer', company_title: 'Ops Inc', location: 'Remote' },
  ],
};

describe('SearchBar Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    fetch.mockClear();
  });

  test('renders input and search button', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/Search for jobs/i)).toBeInTheDocument();
    // Using getByText to uniquely select the "Search" button.
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls fetch and displays suggestions when input length > 2', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockSuggestions),
    });

    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Search for jobs/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Soft' } });
    });

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const suggestionList = await screen.findByRole('list');
    expect(suggestionList).toBeInTheDocument();

    const suggestions = screen.getAllByRole('listitem');
    // Ensure only the first 5 suggestions are displayed.
    expect(suggestions.length).toBe(5);
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
  });

  test('clears suggestions if input length <= 2', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockSuggestions),
    });

    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Search for jobs/i);
    
    // Type a long query to trigger fetch and suggestions.
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Testing' } });
    });
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole('list')).toBeInTheDocument();

    // Now, type a short query (<=2 characters) to clear suggestions.
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Te' } });
    });
    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  test('calls onSearch on form submit and clears suggestions', async () => {
    const onSearchMock = vi.fn();
    // Provide a dummy fetch response to avoid errors in handleChange.
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ results: [] }),
    });

    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/Search for jobs/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Developer' } });
    });

    // Use getByText to select the submit button (which uniquely has text "Search")
    const submitButton = screen.getByText('Search');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(onSearchMock).toHaveBeenCalledWith('Developer');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('clear button clears input and suggestions', async () => {
    // Provide a dummy fetch response.
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ results: [] }),
    });
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Search for jobs/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Test' } });
    });
    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    expect(input.value).toBe('Test');
    await act(async () => {
      fireEvent.click(clearButton);
    });
    expect(input.value).toBe('');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('clicking outside the search container clears suggestions', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockSuggestions),
    });
    render(
      <div>
        <SearchBar onSearch={vi.fn()} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    const input = screen.getByPlaceholderText(/Search for jobs/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Testing suggestions' } });
    });
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const suggestionList = await screen.findByRole('list');
    expect(suggestionList).toBeInTheDocument();

    const outside = screen.getByTestId('outside');
    await act(async () => {
      fireEvent.mouseDown(outside);
    });
    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  test('clicking a suggestion calls onSearch with the suggestion title', async () => {
    const onSearchMock = vi.fn();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockSuggestions),
    });
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/Search for jobs/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Soft' } });
    });
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const suggestionItem = screen.getByText(/Software Engineer/i);
    await act(async () => {
      fireEvent.click(suggestionItem);
    });
    expect(onSearchMock).toHaveBeenCalledWith('Software Engineer');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
