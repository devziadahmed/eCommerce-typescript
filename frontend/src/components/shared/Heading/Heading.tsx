import { memo, ReactNode } from "react";

const Heading = memo(({ title }: { title?: string }) => {
  return (
    <h2
      className="mb-3"
      style={{ fontSize: "26px", paddingBlockEnd: "20px", textTransform: "capitalize" }}
    >
      {title}
    </h2>
  );
});

export default Heading;
