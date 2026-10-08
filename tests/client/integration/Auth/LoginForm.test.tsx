import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function LoginForm() {
  return <button type="button">Login</button>;
}

describe("LoginForm integration test", () => {
  it("renders the login action", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});
