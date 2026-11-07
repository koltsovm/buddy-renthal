import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import LoginPage from "./LoginPage";

const mockMutate = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useLogin: () => ({ mutate: mockMutate, isPending: false }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/login"]}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("LoginPage", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it("should render login form with title", () => {
    const wrapper = createWrapper();
    render(<LoginPage />, { wrapper });

    expect(screen.getByRole("heading", { name: /Вход/i })).toBeTruthy();
    expect(screen.getByPlaceholderText(/Email/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Password/i)).toBeTruthy();
  });

  it("should render 'Вернуться на главную' button", () => {
    const wrapper = createWrapper();
    const { container } = render(<LoginPage />, { wrapper });

    const buttons = container.querySelectorAll("button");
    const back = Array.from(buttons).find((b) => b.textContent?.includes("Вернуться на главную"));
    expect(back).toBeTruthy();
  });

  it("should call useLogin mutate on form submit", () => {
    const wrapper = createWrapper();
    const { container } = render(<LoginPage />, { wrapper });

    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
    const submitButton = container.querySelector("button[type='submit']") as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123!" } });
    fireEvent.submit(submitButton.form!);

    expect(mockMutate).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123!",
    });
  });

  it("should render 'Зарегистрироваться' link", () => {
    const wrapper = createWrapper();
    render(<LoginPage />, { wrapper });

    const registerLinks = screen.getAllByText(/Зарегистрироваться/i);
    expect(registerLinks.length).toBeGreaterThan(0);
  });
});
