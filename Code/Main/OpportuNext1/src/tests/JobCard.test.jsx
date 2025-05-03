import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import JobCard from "../components/JobCard";
import "@testing-library/jest-dom";

describe("JobCard Component", () => {
  const baseJob = {
    job_id: "1",
    title: "Software Engineer",
    company_title: "Tech Engine",
    location: "Remote",
    max_salary: 120000,
    pay_period: "ANNUAL",
    work_type: "Full-time",
    description:
      "This is the first sentence. This is the second sentence. This is the third sentence. This is the fourth sentence.",
    formatted_skills_desc: "JavaScript, React, Node.js",
  };

  it("renders basic job details", () => {
    render(<JobCard job={baseJob} />);

    // Check that basic job info is displayed
    expect(screen.getByText(baseJob.title)).toBeInTheDocument();
    expect(
      screen.getByText(`${baseJob.company_title} • ${baseJob.location}`)
    ).toBeInTheDocument();
    expect(screen.getByText(/Salary:/)).toBeInTheDocument();
    expect(screen.getByText(/\$120,000/)).toBeInTheDocument();
    expect(screen.getByText(/Pay Period:/)).toBeInTheDocument();
    expect(screen.getByText(baseJob.pay_period)).toBeInTheDocument();
    expect(screen.getByText(/Work Type:/)).toBeInTheDocument();
    expect(screen.getByText(baseJob.work_type)).toBeInTheDocument();
  });

  it("toggles expansion when the card is clicked", () => {
    render(<JobCard job={baseJob} />);
    
    // Before clicking, the expanded details should not be in the document.
    expect(screen.queryByText("Description")).not.toBeInTheDocument();

    // Clicking on the card container
    const card = screen.getByText(baseJob.title).closest("div");
    fireEvent.click(card);

    // After clicking, the expanded section should be visible.
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("displays a short description and toggles to full description", () => {
    render(<JobCard job={baseJob} />);
    
    // Expand the card.
    const card = screen.getByText(baseJob.title).closest("div");
    fireEvent.click(card);
    
    // The short description should show the first 3 sentences.
    const shortDescription = "This is the first sentence. This is the second sentence. This is the third sentence.";
    expect(screen.getByText(shortDescription, { exact: false })).toBeInTheDocument();

    // The "View More" button should be present.
    const viewMoreButton = screen.getByRole("button", { name: /View More/i });
    expect(viewMoreButton).toBeInTheDocument();

    // Click the "View More" button.
    fireEvent.click(viewMoreButton);
    expect(screen.getByText(baseJob.description)).toBeInTheDocument();

    // The button should say "View Less"
    expect(screen.getByRole("button", { name: /View Less/i })).toBeInTheDocument();
  });

  it("displays fallback text for missing description and no toggle button", () => {
    const jobWithoutDescription = { ...baseJob, description: "" };
    render(<JobCard job={jobWithoutDescription} />);
    
    // Expand the card.
    const card = screen.getByText(jobWithoutDescription.title).closest("div");
    fireEvent.click(card);
    
    // Displays fallback description.
    expect(screen.getByText("No description available.")).toBeInTheDocument();
    
    // The toggle button should not be rendered.
    expect(screen.queryByRole("button", { name: /View More/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /View Less/i })).not.toBeInTheDocument();
  });

  it("formats salary correctly for hourly jobs", () => {
    const hourlyJob = { ...baseJob, pay_period: "HOURLY", max_salary: 50 };
    render(<JobCard job={hourlyJob} />);
    
    // Should display "Hourly Wage:" instead of "Salary:" and include 'per hour'
    expect(screen.getByText(/Hourly Wage:/)).toBeInTheDocument();
    expect(screen.getByText(/\$50 per hour/)).toBeInTheDocument();
  });
});
