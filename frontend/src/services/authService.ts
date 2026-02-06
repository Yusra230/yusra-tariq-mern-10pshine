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
