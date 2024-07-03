import { SliceState } from "@apptypes/shared";
import { ReactNode } from "react";

type LoadingProps = SliceState & {
  children: ReactNode;
};

const Loading = ({ status, error, children }: LoadingProps) => {
  if (status === "pending") return <p>Loading please wait</p>;

  if (status === "failed" || error) return <p>{error}</p>;

  return <div>{children}</div>;
};

export default Loading;
