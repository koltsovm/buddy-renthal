import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import RegisterPage from "./RegisterPage";

const mockMutate = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useRegister: () => ({ mutate: mockMutate, isPending: false }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/register"]}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("RegisterPage", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it("should render registration form with title", () => {
    const wrapper = createWrapper();
    render(<RegisterPage />, { wrapper });

    expect(screen.getByRole("heading", { name: /Регистрация/i })).toBeTruthy();
    expect(screen.getByPlaceholderText(/Иван Иванов/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/ivan@example.com/i)).toBeTruthy();
    expect(screen.getAllByPlaceholderText(/••••••••••••••••/i)).toHaveLength(2);
  });

  it("should render 'Вернуться на главную' button", () => {
    const wrapper = createWrapper();
    const { container } = render(<RegisterPage />, { wrapper });

    const buttons = container.querySelectorAll("button");
    const back = Array.from(buttons).find((b) => b.textContent?.includes("Вернуться на главную"));
    expect(back).toBeTruthy();
  });

  it("should call useRegister mutate on form submit", () => {
    const wrapper = createWrapper();
    const { container } = render(<RegisterPage />, { wrapper });

    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    const submitButton = container.querySelector("button[type='submit']") as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: "Иван Иванов" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInputs[0], { target: { value: "SecurePass123456!" } });
    fireEvent.change(passwordInputs[1], { target: { value: "SecurePass123456!" } });
    fireEvent.submit(submitButton.form!);

    expect(mockMutate).toHaveBeenCalledWith({
      name: "Иван Иванов",
      email: "test@example.com",
      password: "SecurePass123456!",
    });
  });

  it("should render 'Войти' link", () => {
    const wrapper = createWrapper();
    render(<RegisterPage />, { wrapper });

    const loginLinks = screen.getAllByText(/Войти/i);
    expect(loginLinks.length).toBeGreaterThan(0);
  });
});
