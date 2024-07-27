import axios from "axios";

export function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  } else {
    return "Something went wrong!";
  }
}
