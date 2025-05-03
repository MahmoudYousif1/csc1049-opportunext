import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UploadCV from "../components/UploadCV";
import { describe, test, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal();
    return {
        ...mod,
        useNavigate: () => mockedUsedNavigate,
    };
});

describe("UploadCV Component", () => {
    beforeEach(() => {
        // Reset the navigate mock and clear localStorage before each test.
        mockedUsedNavigate.mockReset();
        localStorage.clear();
    });

    test("redirects to login if user is not logged in", () => {
        // Do not set a username in localStorage.
        render(
            <MemoryRouter>
                <UploadCV />
            </MemoryRouter>
        );

        expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
    });

    test("renders file input and upload button when logged in", () => {
        localStorage.setItem("username", "testuser");
        const { container } = render(
            <MemoryRouter>
                <UploadCV />
            </MemoryRouter>
        );

        // Verify that the upload button is in the document.
        expect(screen.getByRole("button", { name: /Upload CV/i })).toBeInTheDocument();

        // Find the file input using a query selector
        const fileInput = container.querySelector('input[type="file"]');
        expect(fileInput).toBeInTheDocument();
    });

    test("shows error message if no file is selected on upload", async () => {
        localStorage.setItem("username", "testuser");
        render(
            <MemoryRouter>
                <UploadCV />
            </MemoryRouter>
        );

        // Click the upload button without selecting a file.
        const uploadButton = screen.getByRole("button", { name: /Upload CV/i });
        fireEvent.click(uploadButton);

        // Wait for the error message to appear.
        await waitFor(() => {
            expect(screen.getByText(/Please select a file first/i)).toBeInTheDocument();
        });
    });

    test("successful upload displays success message", async () => {
        localStorage.setItem("username", "testuser");

        // Create a dummy file.
        const file = new File(["dummy content"], "dummy.pdf", { type: "application/pdf" });

        // Mock fetch to return a successful response.
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "CV uploaded successfully!" }),
            })
        );

        const { container } = render(
            <MemoryRouter>
                <UploadCV />
            </MemoryRouter>
        );

        // Get the file input element.
        const fileInput = container.querySelector('input[type="file"]');
        // Simulate selecting a file.
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Click the upload button.
        const uploadButton = screen.getByRole("button", { name: /Upload CV/i });
        fireEvent.click(uploadButton);

        // Wait for the success message to appear.
        await waitFor(() => {
            expect(screen.getByText(/CV uploaded successfully!/i)).toBeInTheDocument();
        });
    });

    test("failed upload displays error message", async () => {
        localStorage.setItem("username", "testuser");

        // Create a dummy file.
        const file = new File(["dummy content"], "dummy.pdf", { type: "application/pdf" });

        // Mock fetch to return a failure response.
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: "Upload failed" }),
            })
        );

        const { container } = render(
            <MemoryRouter>
                <UploadCV />
            </MemoryRouter>
        );

        const fileInput = container.querySelector('input[type="file"]');
        fireEvent.change(fileInput, { target: { files: [file] } });

        const uploadButton = screen.getByRole("button", { name: /Upload CV/i });
        fireEvent.click(uploadButton);

        // Wait for the error message to appear.
        await waitFor(() => {
            expect(screen.getByText(/Upload failed/i)).toBeInTheDocument();
        });
    });

    test("displays network error message on fetch failure", async () => {
        localStorage.setItem("username", "testuser");

        const file = new File(["dummy content"], "dummy.pdf", { type: "application/pdf" });

        // Mock fetch to reject (simulate a network error).
        global.fetch = vi.fn(() => Promise.reject(new Error("Network Error")));

        const { container } = render(
            <MemoryRouter>
                <UploadCV />
            </MemoryRouter>
        );

        const fileInput = container.querySelector('input[type="file"]');
        fireEvent.change(fileInput, { target: { files: [file] } });

        const uploadButton = screen.getByRole("button", { name: /Upload CV/i });
        fireEvent.click(uploadButton);

        // Wait for the network error message.
        await waitFor(() => {
            expect(screen.getByText(/An error occurred. Please try again./i)).toBeInTheDocument();
        });
    });
});
