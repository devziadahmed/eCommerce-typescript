import { memo, ReactNode } from "react";

const Heading = memo(({ title }: { title?: string }) => {
  return (
    <h2
      style={{
        fontSize: "26px",
        paddingBlockEnd: "20px",
        textTransform: "capitalize",
        margin: "0",
      }}
    >
      {title}
    </h2>
  );
});

export default Heading;
