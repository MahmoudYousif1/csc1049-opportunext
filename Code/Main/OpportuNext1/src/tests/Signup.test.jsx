import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../components/Signup";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Signup Component", () => {
  test("renders signup form", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("handles user input correctly", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "testpassword" },
    });

    expect(screen.getByPlaceholderText(/Username/i).value).toBe("testuser");
    expect(screen.getByPlaceholderText(/Email/i).value).toBe("testuser@example.com");
    expect(screen.getByPlaceholderText(/Password/i).value).toBe("testpassword");
  });
});
