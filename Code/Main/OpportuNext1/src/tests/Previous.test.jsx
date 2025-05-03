import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Previous from '../components/Previous';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Previous Component', () => {
  it('renders the title "Previous Searches"', () => {
    render(<Previous searches={[]} onSelectSearch={vi.fn()} />);
    expect(screen.getByText('Previous Searches')).toBeInTheDocument();
  });

  it('renders only the 4 most recent searches in reverse order', () => {
    // Provided more than 4 searches to test the slicing and reversal.
    const searches = ['Search1', 'Search2', 'Search3', 'Search4', 'Search5'];
    render(<Previous searches={searches} onSelectSearch={vi.fn()} />);
    
    // We take the last 4 items and reverse them.
    expect(screen.getByText('Search5')).toBeInTheDocument();
    expect(screen.getByText('Search4')).toBeInTheDocument();
    expect(screen.getByText('Search3')).toBeInTheDocument();
    expect(screen.getByText('Search2')).toBeInTheDocument();

    // "Search1" should not appear.
    expect(screen.queryByText('Search1')).not.toBeInTheDocument();
  });

  it('calls onSelectSearch with the correct query when a search is clicked', () => {
    const searches = ['one', 'two', 'three', 'four', 'five'];
    // With these 5 searches, the recent ones rendered are the last 4 reversed:
    // ["Epsilon", "Delta", "Gamma", "Beta"]
    const onSelectSearchMock = vi.fn();
    render(<Previous searches={searches} onSelectSearch={onSelectSearchMock} />);

    // Click on the first rendered item
    const searchItem = screen.getByText('five');
    fireEvent.click(searchItem);

    expect(onSelectSearchMock).toHaveBeenCalledWith('five');
  });
});
