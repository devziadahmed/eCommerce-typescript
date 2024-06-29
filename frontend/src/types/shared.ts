export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Status = "idle" | "pending" | "succeeded" | "failed";

export type SliceState = {
  status: Status;
  error: string | null;
};
