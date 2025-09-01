import React from 'react';
import LeftMenuButton from '../left-menu/Button';
import LeftMenuAvatar from '../left-menu/Avatar';
import HomePage from '../../pages/Home';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Импорт иконок (пока заглушки)
const HomeIcon = '<svg>...</svg>';
const BookmarkIcon = '<svg>...</svg>';
const FriendsIcon = '<svg>...</svg>';
const CollectionIcon = '<svg>...</svg>';
const DiscoverIcon = '<svg>...</svg>';
const SearchIcon = '<svg>...</svg>';
const NotificationIcon = '<svg>...</svg>';
const SettingsIcon = '<svg>...</svg>';

interface LeftMenuProps {
  viewInfo: {
    viewportComponent: React.ComponentType<any>;
    args: any;
  };
  setViewInfo: (viewInfo: any) => void;
  setViewInfoOld: (viewInfoOld: any) => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ viewInfo, setViewInfo, setViewInfoOld }) => {
  const [utoken] = useLocalStorage('user_token', null);
  const parsedToken = utoken ? JSON.parse(utoken) : null;

  const views = [
    HomePage, // 0 - Home
    // Добавить остальные компоненты по мере их создания
  ];

  const DefaultAvatar: React.FC<{ callback: (() => void) | null }> = ({ callback }) => (
    <LeftMenuAvatar
      onClickCallback={callback}
      avatar="./assets/icons/defaultAvatar.svg"
    />
  );

  return (
    <div className={`left-menu menu-hidden unselectable ${viewInfo.viewportComponent === views[11] ? 'hide' : ''}`}>
      <div className="top-menu-content">
        {!parsedToken ? (
          <DefaultAvatar callback={() => window.updateViewportComponent(10)} />
        ) : (
          <DefaultAvatar callback={() => window.updateViewportComponent(9, parsedToken.id)} />
        )}

        <LeftMenuButton
          icon={HomeIcon}
          selected={viewInfo.viewportComponent === views[0]}
          viewportComponentIndex={0}
        />
        <LeftMenuButton
          icon={BookmarkIcon}
          selected={viewInfo.viewportComponent === views[1]}
          viewportComponentIndex={1}
        />
        <LeftMenuButton
          icon={FriendsIcon}
          selected={viewInfo.viewportComponent === views[2]}
          viewportComponentIndex={2}
        />
        <LeftMenuButton
          icon={CollectionIcon}
          selected={viewInfo.viewportComponent === views[3]}
          viewportComponentIndex={3}
        />
        <LeftMenuButton
          icon={DiscoverIcon}
          selected={viewInfo.viewportComponent === views[4]}
          viewportComponentIndex={4}
        />
        <LeftMenuButton
          icon={SearchIcon}
          selected={viewInfo.viewportComponent === views[5]}
          viewportComponentIndex={5}
        />
      </div>
      <div className="bottom-menu-content">
        <LeftMenuButton
          icon={NotificationIcon}
          selected={viewInfo.viewportComponent === views[6]}
          viewportComponentIndex={6}
        />
        <LeftMenuButton
          icon={SettingsIcon}
          selected={viewInfo.viewportComponent === views[7]}
          viewportComponentIndex={7}
        />
      </div>
    </div>
  );
};

export default LeftMenu;