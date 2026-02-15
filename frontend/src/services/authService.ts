// services/authService.ts

export interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
  createdAt?: string;
  lastLogin: string | null;
}

// export const addUserToServer = async (
//   userData: SignupPayload
// ): Promise<User> => {
//   const response = await fetch("http://localhost:3000/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Signup failed");
//   }

//   return {
//     id: data.user._id,
//     email: data.user.email,
//     createdAt: data.user.createdAt,
//     lastLogin:null
//   };
// };

export const addUserToServer = async (
  userData: SignupPayload
): Promise<{ user: User; token: string }> => {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return {
    user: {
      id: data.user._id,
      email: data.user.email,
      createdAt: data.user.createdAt,
      lastLogin: null
    },
    token: data.token
  };
};


export const loginToServer = async (
  userData: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return {
    user: {
      id: data.user.id || data.user._id,
      email: data.user.email,
      lastLogin:data.user.lastLogin,
    },
    token: data.token, // return JWT token
  };
};

export const forgotPasswordToServer = async (email: string): Promise<void> => {
  const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send reset link");
  }

  return data
};

// services/authService.ts
export const verifyResetCodeOnServer = async (
  email: string,
  code: string
): Promise<{ success: boolean; message: string }> => {
  const response = await fetch("http://localhost:3000/api/auth/verify-reset-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Verification failed");
  }

  return data;
};

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

export const resetPasswordOnServer = async (payload: ResetPasswordPayload) => {
  const response = await fetch("http://localhost:3000/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
};

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const changePasswordOnServer = async (
  payload: ChangePasswordPayload
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:3000/api/auth/change-password",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // IMPORTANT for private route
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
};
