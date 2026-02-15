import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import * as authService from "../services/authService";

jest.mock("../services/authService");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders all fields", () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(2);
    expect(
      screen.getByRole("checkbox", { name: /i agree to the terms/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  test("shows error if passwords do not match", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "test@example.com"
    );

    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    await user.type(passwordInputs[0], "password123");
    await user.type(passwordInputs[1], "different");

    await user.click(
      screen.getByRole("checkbox", { name: /i agree to the terms/i })
    );
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test("shows error if password is too short", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "test@example.com"
    );

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    await user.type(passwordInputs[0], '12345');
    await user.type(passwordInputs[1], '12345');

    await user.click(
      screen.getByRole("checkbox", { name: /i agree to the terms/i })
    );
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    const user = userEvent.setup();
    const mockSignup = authService.addUserToServer as jest.Mock;
    mockSignup.mockResolvedValue({
      user: { id: "1", email: "test@example.com", lastLogin: null },
      token: "fake-token",
    });

    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "test@example.com"
    );

    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    await user.type(passwordInputs[0], "password123"); // password
    await user.type(passwordInputs[1], "password123"); // confirm password

    await user.click(
      screen.getByRole("checkbox", { name: /i agree to the terms/i })
    );
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(mockSignup).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
