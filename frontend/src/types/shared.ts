import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Status = "idle" | "pending" | "succeeded" | "failed";

export type SliceState = {
  status: Status;
  error: string | null;
};

export type ThunkPromise<T> = Promise<
  | PayloadAction<
      T,
      string,
      { arg: void; requestId: string; requestStatus: "fulfilled" },
      never
    >
  | PayloadAction<
      unknown,
      string,
      {
        arg: void;
        requestId: string;
        requestStatus: "rejected";
        aborted: boolean;
        condition: boolean;
      } & ({ rejectedWithValue: true } | ({ rejectedWithValue: false } & {})),
      SerializedError
    >
> & { __linterBrands: "SafePromise" } & {
  abort: (reason?: string) => void;
  requestId: string;
  arg: void;
  unwrap: () => Promise<T>;
};
