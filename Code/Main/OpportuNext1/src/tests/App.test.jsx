import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Override BrowserRouter to use MemoryRouter in tests.
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BrowserRouter: ({ children }) => <div>{children}</div>,
  };
});

// Mock the route components and return an object with a default property.
vi.mock('../components/MainHome', () => ({
  default: () => <div>MainHome Page</div>,
}));
vi.mock('../components/MainHome2', () => ({
  default: () => <div>MainHome2 Page</div>,
}));
vi.mock('../components/About', () => ({
  default: () => <div>About Page</div>,
}));
vi.mock('../components/Signup', () => ({
  default: () => <div>Signup Page</div>,
}));
vi.mock('../components/Login', () => ({
  default: () => <div>Login Page</div>,
}));
vi.mock('../components/SearchResults', () => ({
  default: () => <div>SearchResults Page</div>,
}));
vi.mock('../components/UploadCV', () => ({
  default: () => <div>UploadCV Page</div>,
}));
vi.mock('../components/AccountManagement', () => ({
  default: () => <div>AccountManagement Page</div>,
}));

describe('App Routing', () => {
  it('renders MainHome for the "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('MainHome Page')).toBeInTheDocument();
  });

  it('renders MainHome2 for the "/mainhome2" route', () => {
    render(
      <MemoryRouter initialEntries={['/mainhome2']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('MainHome2 Page')).toBeInTheDocument();
  });

  it('renders About for the "/about" route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  it('renders Signup for the "/signup" route', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Signup Page')).toBeInTheDocument();
  });

  it('renders Login for the "/login" route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders SearchResults for the "/searchresults" route', () => {
    render(
      <MemoryRouter initialEntries={['/searchresults']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('SearchResults Page')).toBeInTheDocument();
  });

  it('renders UploadCV for the "/upload-cv" route', () => {
    render(
      <MemoryRouter initialEntries={['/upload-cv']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('UploadCV Page')).toBeInTheDocument();
  });

  it('renders AccountManagement for the "/account" route', () => {
    render(
      <MemoryRouter initialEntries={['/account']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('AccountManagement Page')).toBeInTheDocument();
  });
});
