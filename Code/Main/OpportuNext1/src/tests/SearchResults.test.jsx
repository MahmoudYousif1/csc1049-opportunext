import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import { describe, test, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

// Mock the fetch API globally using Vitest's vi.fn()
global.fetch = vi.fn();

const mockJobs = {
  results: [
    {
      job_id: "1",
      title: "Software Engineer",
      company_title: "Tech Corp",
      location: "Remote",
      description: "A great opportunity for a software engineer...",
    },
    {
      job_id: "2",
      title: "Frontend Developer",
      company_title: "Web Solutions",
      location: "Dublin",
      description: "Looking for a React developer...",
    },
  ],
  total_results: 2,
  current_page: 1,
};

describe("SearchResults Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    fetch.mockClear();
    // Mute any pagination debugging logs from the component.
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  test("renders search results correctly", async () => {
    // Return the mockJobs object when fetch is called.
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue(mockJobs),
    });

    // Pass a query in the URL so that the component doesn't exit early.
    render(
      <MemoryRouter initialEntries={["/?query=test"]}>
        <SearchResults />
      </MemoryRouter>
    );

    // Wait for the fetch call.
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(
      await screen.findByRole("heading", { level: 3, name: /Software Engineer/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { level: 3, name: /Frontend Developer/i })
    ).toBeInTheDocument();
  });

  test("displays loading indicator before results load", async () => {
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue(mockJobs),
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/?query=test"]}>
        <SearchResults />
      </MemoryRouter>
    );

    // Check that the loader is present.
    expect(container.querySelector(".loader")).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  test('displays "No jobs found." if API returns empty results', async () => {
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue({ results: [], total_results: 0 }),
    });

    render(
      <MemoryRouter initialEntries={["/?query=test"]}>
        <SearchResults />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(await screen.findByText("No jobs found.")).toBeInTheDocument();
  });

  test('fetches more jobs when clicking "Load More Jobs"', async () => {
    // For this test, the initial response has fewer jobs than total_results.
    const initialJobs = {
      results: [
        {
          job_id: "1",
          title: "Software Engineer",
          company_title: "Tech Corp",
          location: "Remote",
          description: "Explore software like never before...",
        },
        {
          job_id: "2",
          title: "Frontend Developer",
          company_title: "Web Solutions",
          location: "Dublin",
          description: "Looking for an experienced Python developer...",
        },
      ],
      total_results: 3,
      current_page: 1,
    };

    fetch
      .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue(initialJobs) }) // Initial fetch
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue({
          results: [
            {
              job_id: "3",
              title: "Backend Developer",
              company_title: "Server Tech",
              location: "Remote",
              description: "Develop server-side applications...",
            },
          ],
          total_results: 3,
          current_page: 2,
        }),
      });

    render(
      <MemoryRouter initialEntries={["/?query=test"]}>
        <SearchResults />
      </MemoryRouter>
    );

    // Wait for the initial fetch.
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Find the "Load More Jobs" button.
    const loadMoreButton = await screen.findByRole("button", {
      name: /Load More Jobs/i,
    });
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);
  });

  test('hides "Load More Jobs" when no more results are available', async () => {
    // default mockJobs where total_results equals the number of results.
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue(mockJobs),
    });

    render(
      <MemoryRouter initialEntries={["/?query=test"]}>
        <SearchResults />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const loadMoreButton = screen.queryByRole("button", { name: /Load More Jobs/i });
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
