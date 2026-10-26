import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm";
import { DEFAULT_FORM } from "../constants";

describe("LoginForm demo credentials", () => {
  it("shows the demo account emails and shared password", () => {
    render(
      <LoginForm
        form={DEFAULT_FORM}
        loading={false}
        updateField={vi.fn()}
        onForgotPassword={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /explore interactive demo mode/i }));

    expect(screen.getByText("demo.student@acadhub.demo")).toBeInTheDocument();
    expect(screen.getByText("demo.faculty@acadhub.demo")).toBeInTheDocument();
    expect(screen.getByText("demo.admin@acadhub.demo")).toBeInTheDocument();
    expect(screen.getByText("AcadHub@Demo2026")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /student demo/i }));
    expect(screen.getByDisplayValue("demo.student@acadhub.demo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("AcadHub@Demo2026")).toBeInTheDocument();
  });
});
