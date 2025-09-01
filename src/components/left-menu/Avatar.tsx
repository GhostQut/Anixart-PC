import React from 'react';

interface LeftMenuAvatarProps {
  onClickCallback: (() => void) | null;
  avatar: string;
}

const LeftMenuAvatar: React.FC<LeftMenuAvatarProps> = ({ onClickCallback, avatar }) => {
  return (
    <button className="left-menu-profile" onClick={onClickCallback || undefined}>
      <img width="50" height="50" src={avatar} alt="avatar" />
    </button>
  );
};

export default LeftMenuAvatar;