import React, { ReactNode } from 'react';

interface BaseMainButtonProps {
  onClickCallback?: (event: React.MouseEvent) => void;
  height?: number;
  borderRadius?: number;
  customClasses?: string;
  width?: string;
  style?: 'default' | 'primary' | 'transparent';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  currentColorVar?: string;
  isLoading?: boolean;
  children: ReactNode;
}

const BaseMainButton: React.FC<BaseMainButtonProps> = ({
  onClickCallback,
  height = 30,
  borderRadius = 20,
  customClasses = "",
  width = "auto",
  style = "default",
  disabled = false,
  type = "button",
  currentColorVar = "--main-text-color",
  isLoading = false,
  children
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (!disabled && !isLoading && onClickCallback) {
      onClickCallback(event);
    }
  };

  return (
    <button 
      className={`base-main-button ${customClasses} ${style}`}
      type={type}
      disabled={disabled || isLoading}
      style={{
        '--current-color': `var(${currentColorVar})`,
        '--height': `${height}px`,
        '--width': width,
        '--border-radius': `${borderRadius}px`
      } as React.CSSProperties}
      onClick={handleClick}
    >
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default BaseMainButton;