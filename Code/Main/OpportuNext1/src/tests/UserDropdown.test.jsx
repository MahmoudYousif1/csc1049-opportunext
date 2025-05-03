import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import UserDropdown from "../components/UserDropdown";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock useNavigate
const mockedUsedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe("UserDropdown Component", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
    localStorage.clear();
  });

  afterEach(() => {
    // Cleans any event listeners
    vi.restoreAllMocks();
  });

  it("renders with default username when none is provided", () => {
    render(
      <MemoryRouter>
        <UserDropdown />
      </MemoryRouter>
    );
    // Check that the button displays "User"
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  it("renders with the provided username", () => {
    render(
      <MemoryRouter>
        <UserDropdown username="TestUser" />
      </MemoryRouter>
    );
    expect(screen.getByText("TestUser")).toBeInTheDocument();
  });

  it("toggles the dropdown when the user button is clicked", async () => {
    render(
      <MemoryRouter>
        <UserDropdown username="TestUser" />
      </MemoryRouter>
    );
    
    // Dropdown should not be visible initially.
    expect(screen.queryByText(/Manage Account/i)).not.toBeInTheDocument();
    
    // Click the user button.
    const userButton = screen.getByText("TestUser").closest("button");
    fireEvent.click(userButton);
    
    // Now dropdown should appear.
    expect(await screen.findByText(/Manage Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    // Click the user button again to toggle close.
    fireEvent.click(userButton);
    await waitFor(() =>
      expect(screen.queryByText(/Manage Account/i)).not.toBeInTheDocument()
    );
  });

  it("closes the dropdown when clicking outside", async () => {
    const { container } = render(
      <MemoryRouter>
        <div>
          <UserDropdown username="TestUser" />
          {/* An element outside the dropdown */}
          <div data-testid="outside">Outside Element</div>
        </div>
      </MemoryRouter>
    );

    // Open the dropdown.
    const userButton = screen.getByText("TestUser").closest("button");
    fireEvent.click(userButton);
    expect(await screen.findByText(/Manage Account/i)).toBeInTheDocument();

    // Click on an element outside the dropdown.
    const outsideElement = screen.getByTestId("outside");
    fireEvent.mouseDown(outsideElement);

    await waitFor(() =>
      expect(screen.queryByText(/Manage Account/i)).not.toBeInTheDocument()
    );
  });

  it("navigates to /account when 'Manage Account' is clicked", async () => {
    render(
      <MemoryRouter>
        <UserDropdown username="TestUser" />
      </MemoryRouter>
    );

    // Open the dropdown.
    const userButton = screen.getByText("TestUser").closest("button");
    fireEvent.click(userButton);
    const manageAccountButton = await screen.findByText(/Manage Account/i);

    fireEvent.click(manageAccountButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/account");
  });

  it("removes username from localStorage and navigates to '/' when 'Logout' is clicked", async () => {
    localStorage.setItem("username", "TestUser");
    render(
      <MemoryRouter>
        <UserDropdown username="TestUser" />
      </MemoryRouter>
    );

    // Open the dropdown.
    const userButton = screen.getByText("TestUser").closest("button");
    fireEvent.click(userButton);
    const logoutButton = await screen.findByText(/Logout/i);

    fireEvent.click(logoutButton);
    expect(localStorage.getItem("username")).toBeNull();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
