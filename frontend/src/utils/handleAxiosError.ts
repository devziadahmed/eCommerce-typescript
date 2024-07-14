import axios from "axios";

export function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || error.message;
  } else {
    return "Something went wrong!";
  }
}
