// src/components/ui/Skeleton.tsx


interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton = ({ width = "100%", height = "1rem", className = "" }: SkeletonProps) => (
  <div
    className={`animate-pulse rounded bg-surface-container/30 ${className}`}
    style={{ width, height }}
  />
);
