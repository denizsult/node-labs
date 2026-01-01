// Request Types
export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

// Response Types
export type UserResponse = {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  lastLoginAt?: string;
  lastLoginIP?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Register Response (201) - data field contains simplified user info
export type RegisterResponseData = {
  id: string;
  fullName: string;
  email: string;
};

// Login Response (200) - data field contains user and accessToken
export type LoginResponseData = {
  user: UserResponse;
  accessToken: string;
};

// Refresh Token Response (200) - direct response, not wrapped in ApiResponse
export type RefreshTokenResponse = {
  accessToken: string;
};

// Generic API Response wrapper
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code?: string;
};

// Type aliases for API responses
export type RegisterResponse = ApiResponse<RegisterResponseData>;
export type LoginResponse = ApiResponse<LoginResponseData>;
