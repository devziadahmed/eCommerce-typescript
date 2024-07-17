import { ReactNode, Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspenseFallback = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="d-flex flex-column align-items-center" style={{ marginTop: "15%" }}>
          <LottieHandler type="loading" width={300} height={240} />
          <h2 style={{ color: "#444", letterSpacing: "2px" }}>Loading...</h2>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;
