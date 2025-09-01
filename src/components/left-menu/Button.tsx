import React from 'react';
import Icon from '../elements/Icon';

interface LeftMenuButtonProps {
  viewportComponentIndex: number;
  icon: string;
  selected: boolean;
}

const LeftMenuButton: React.FC<LeftMenuButtonProps> = ({ 
  viewportComponentIndex, 
  icon, 
  selected 
}) => {
  return (
    <button 
      className={`left-menu-button ${selected ? 'selected' : ''}`}
      onClick={() => window.updateViewportComponent(viewportComponentIndex)}
    >
      <Icon src={icon} varColor="--main-text-color" size={{ width: 20, height: 20 }} />
    </button>
  );
};

export default LeftMenuButton;