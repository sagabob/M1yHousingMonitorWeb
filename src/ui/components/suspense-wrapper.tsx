import { Suspense, type ReactNode } from "react";
import SuspenseFallback from "./suspense-fallback";

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  cardCount?: number;
  message?: string;
}

const SuspenseWrapper = ({ 
  children, 
  fallback,
  cardCount = 2,
  message = "Loading..."
}: SuspenseWrapperProps) => {
  const defaultFallback = (
    <SuspenseFallback 
      cardCount={cardCount} 
      message={message} 
    />
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;