import { ReactNode } from "react";

interface GlassContainerProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onArrowClick?: () => void;
}

export const GlassContainer = ({
  children,
  title,
  className = "",
  onArrowClick,
}: GlassContainerProps) => {
  return (
    <div
      className={`relative w-full bg-gray-800/70 backdrop-blur-md border border-gray-600/30 shadow-lg rounded-xl ${className}`}
    >
      {title && (
        <div className="pr-10 border-b border-gray-600/30 pb-3 mb-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
        </div>
      )}

      {onArrowClick && (
        <button
          onClick={onArrowClick}
          className="absolute top-3 right-3 w-8 h-8 bg-gray-900/80 backdrop-blur-sm border border-gray-500/30 rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/80"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {children}
    </div>
  );
};
