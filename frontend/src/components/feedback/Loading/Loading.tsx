import { ReactNode } from "react";
import { SliceState } from "@apptypes/shared";

import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonTypes = {
  cart: CartSkeleton,
  product: ProductSkeleton,
  category: CategorySkeleton,
};

export type LoadingProps = SliceState & {
  children: ReactNode;
  type: keyof typeof skeletonTypes;
};

const Loading = ({ status, error, type, children }: LoadingProps) => {
  const SkeletonComponent = skeletonTypes[type];
  if (status === "pending") return <SkeletonComponent />;

  if (status === "failed" || error)
    return (
      <div className="d-flex flex-column align-items-center">
        <LottieHandler type="error" width={300} height={240} />
        <p className="error fw-bold fs-4">{error}</p>
      </div>
    );

  return <div>{children}</div>;
};

export default Loading;
