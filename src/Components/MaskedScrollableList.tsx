import React from "react";

interface MaskedScrollableListProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

const MaskedScrollableList = ({
  children,
  className = "",
  maxHeight = "300px",
}: MaskedScrollableListProps) => {
  return (
    <ul
      className={`relative space-y-3 overflow-y-auto pb-6 pr-1 ${className}`}
      style={{
        maxHeight,
        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
      }}
    >
      {children}
    </ul>
  );
};

export default MaskedScrollableList;
