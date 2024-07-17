import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notFound.json";
import empty from "@assets/lottieFiles/empty.json";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";

const lottieTypes = {
  notFound,
  empty,
  loading,
  error,
};

type LottieHandlerProps = {
  type: keyof typeof lottieTypes;
  width?: number;
  height?: number;
  onLoopComplete?: () => void;
};

const LottieHandler = ({ type, width, height, onLoopComplete }: LottieHandlerProps) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Lottie
        animationData={lottieTypes[type]}
        style={{
          width: width + "px",
          height: height + "px",
          marginBottom: "15px",
        }}
        onLoopComplete={onLoopComplete}
      />
    </div>
  );
};

export default LottieHandler;
