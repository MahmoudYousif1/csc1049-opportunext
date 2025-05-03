import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";
import { describe, test, expect, vi, beforeEach } from "vitest";
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

describe("Login Component", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
    localStorage.clear();
  });

  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  test("handles user input correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpassword");
  });

  test("submits the form successfully and navigates", async () => {
    const fakeResponse = {
      username: "testuser",
      message: "Login successful",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      })
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Log In/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/login/",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "testuser", password: "testpassword" }),
        })
      );

      expect(localStorage.getItem("username")).toBe("testuser");

      
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/mainhome2", {
        state: {
          message: "Login successful",
          username: "testuser",
        },
      });
    });
  });

  test("displays success message if provided via location state", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/login", state: { message: "Account created successfully" } }]}
      >
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Account created successfully/i)).toBeInTheDocument();
  });
});
