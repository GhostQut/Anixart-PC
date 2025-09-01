import React from 'react';

interface IconProps {
  src: string;
  color?: string;
  varColor?: string;
  size?: {
    width: number;
    height: number;
  };
  viewBox?: string;
}

const Icon: React.FC<IconProps> = ({ 
  src = "", 
  color, 
  varColor, 
  size = { width: 20, height: 20 },
  viewBox 
}) => {
  const extractViewBox = (svg: string) => {
    const regex = /viewBox="([\d\- \.]+)"/;
    const res = regex.exec(svg);
    if (!res) return "0 0 20 20";
    return res[1];
  };

  const extractedViewBox = viewBox || extractViewBox(src);
  const elements = src.replace(/<svg[ \n]([^>]*)>/, "").replace("</svg>", "");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size.width}
      height={size.height}
      viewBox={extractedViewBox}
      style={{ 
        color: varColor ? `var(${varColor})` : color,
        transition: 'all 0.2s ease-in-out'
      }}
      dangerouslySetInnerHTML={{ __html: elements }}
    />
  );
};

export default Icon;