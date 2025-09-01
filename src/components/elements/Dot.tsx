import React from 'react';

interface DotProps {
  size?: {
    width: number;
    height: number;
  };
  color?: string;
}

const Dot: React.FC<DotProps> = ({ 
  size = { width: 3, height: 3 }, 
  color = "--third-text-color" 
}) => {
  return (
    <svg 
      className="dot" 
      style={{ fill: `var(${color})` }} 
      width={size.width} 
      height={size.height} 
      viewBox="0 0 3 3" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="#00000" />
    </svg>
  );
};

export default Dot;