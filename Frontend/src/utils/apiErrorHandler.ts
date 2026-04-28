import toast from "react-hot-toast";
import { ERROR_MESSAGES, DEFAULT_ERROR } from "../config/errorMessages";

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

interface ApiSuccessResponse {
  success: true;
  message: string;
}

type ApiResponse = ApiErrorResponse | ApiSuccessResponse;

// Extracts a user-friendly message from an error response
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as { response?: { data?: ApiErrorResponse } };
    const code = axiosError.response?.data?.error?.code;
    const backendMessage = axiosError.response?.data?.error?.message;

    if (code && ERROR_MESSAGES[code]) {
      return ERROR_MESSAGES[code];
    }
    if (backendMessage) {
      return backendMessage;
    }
  }

  if (error instanceof Error) {
    if (error.message === "Network Error" || error.message.includes("network")) {
      return ERROR_MESSAGES["NETWORK_ERROR"];
    }
  }

  return DEFAULT_ERROR;
}

// Shows a toast.error with the mapped message
export function handleApiError(error: unknown): string {
  const message = getErrorMessage(error);
  toast.error(message);
  return message;
}

// Wraps an async API call with loading toast, success toast, and error handling
export async function withToast<T>(
  fn: () => Promise<T>,
  messages: {
    loading: string;
    success: string;
  }
): Promise<T> {
  const toastId = toast.loading(messages.loading);
  try {
    const result = await fn();
    toast.success(messages.success, { id: toastId });
    return result;
  } catch (error) {
    const message = getErrorMessage(error);
    toast.error(message, { id: toastId });
    throw error;
  }
}
