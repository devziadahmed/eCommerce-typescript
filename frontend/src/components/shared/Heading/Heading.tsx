import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="mb-3" style={{ fontSize: "26px", paddingBlockEnd: "20px" }}>
      {children}
    </h2>
  );
};

export default Heading;
