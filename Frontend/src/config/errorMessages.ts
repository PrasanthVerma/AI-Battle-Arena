export const ERROR_MESSAGES: Record<string, string> = {
  // Auth
  INVALID_EMAIL: "Invalid Email ID",
  INVALID_PASSWORD: "Invalid Password",
  USER_ALREADY_EXISTS: "User already registered",
  UNAUTHORIZED: "Incorrect email or password",
  USER_NOT_FOUND: "No account found with this email",
  INVALID_CREDENTIALS: "Incorrect email or password",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists",
  USERNAME_ALREADY_EXISTS: "This username is already taken",
  INVALID_TOKEN: "Session expired, please log in again",

  // General
  SERVER_ERROR: "Something went wrong, please try again",
  NETWORK_ERROR: "Network error, check your connection",
  FORBIDDEN: "You do not have permission to do this",
  NOT_FOUND: "The requested resource was not found",
  TOO_MANY_REQUESTS: "Too many requests, slow down",
  VALIDATION_ERROR: "Please check your input and try again",
};

export const DEFAULT_ERROR = "Something went wrong, please try again";
