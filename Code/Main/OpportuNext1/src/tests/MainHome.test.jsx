import React from 'react';
import { render, screen, act } from '@testing-library/react';
import MainHome from '../components/MainHome';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock testing child components
vi.mock('../components/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));
vi.mock('../components/About', () => ({
  default: () => <div data-testid="about">About Section</div>,
}));
vi.mock('../components/FooterSection', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

describe('MainHome Component', () => {
  beforeEach(() => {
    // Using fake timers so that we can control setTimeout.
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders the main headings and mocked child components', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: {} }]}>
        <MainHome />
      </MemoryRouter>
    );

    // Check for the main heading text
    expect(
      screen.getByText(/LET YOUR PASSION BE THE COMPASS TO YOUR IDEAL JOB/i)
    ).toBeInTheDocument();
    // Check for subheading text
    expect(
      screen.getByText(/Discover over 60,000 job opportunities/i)
    ).toBeInTheDocument();

    // Check that the Navbar, About, and Footer components are rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders the sliding images section with double the image count', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: {} }]}>
        <MainHome />
      </MemoryRouter>
    );
    
    // In MainHome, images are mapped twice.
    // If there are 11 images originally, we expect 22 <img> elements.
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(22);
    
    // Checking that the alt texts contain "Slide"
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', expect.stringContaining('Slide'));
    });
  });

  it('displays a success message when provided and removes it after 3 seconds', async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/', state: { message: 'Success!' } }]}
      >
        <MainHome />
      </MemoryRouter>
    );

    // The success message should be rendered initially.
    expect(screen.getByText('Success!')).toBeInTheDocument();

    // Wrap the timer advance in act so that state updates are flushed.
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    // The success message should no longer be in the document.
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });
});
