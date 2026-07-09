import Skeleton from "@mui/material/Skeleton";

import "./skeleton.css";

type SkeletonProps = {
  width?: number | string;

  height?: number | string;

  variant?: "text" | "rectangular" | "rounded" | "circular";

  animation?: "pulse" | "wave" | false;
};

const AppSkeleton = ({
  width = "100%",
  height = 20,
  variant = "rounded",
  animation = "wave",
}: SkeletonProps) => {
  return (
    <Skeleton
      width={width}
      height={height}
      variant={variant}
      animation={animation}
    />
  );
};

export default AppSkeleton;
