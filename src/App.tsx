import React, { useState, useEffect } from 'react';
import TitleBar from './components/gui/TitleBar';
import LeftMenu from './components/gui/LeftMenu';
import HomePage from './pages/Home';
import { Anixart } from 'anixartjs';
import MetaInfo from './components/gui/MetaInfo';
import Utils from './utils';
import BaseModal from './components/modal/BaseModal';
import FirstRunModal from './components/modal/FirstRunModal';
import { useLocalStorage } from './hooks/useLocalStorage';

// Глобальные переменные
declare global {
  interface Window {
    utils: typeof Utils;
    waitForElm: (selector: string) => Promise<Element>;
    baseSettings: any;
    versions: any;
    anixApi: any;
    profileInfo: any;
    profileSettings: any;
    pageHistory: any[];
    upscaleEnable: boolean;
    avaliableGPU: boolean;
    setViewportScrollEvent: (callback: ((e: Event) => void) | null) => void;
    updateViewportComponent: (page: any, args?: any, history?: boolean) => void;
    discordRPC: any;
    titleBarAPI: any;
    analytics: any;
    winApi: any;
    Sibnet: any;
    elecWindow: any;
    settings: any;
    prc: any;
  }
}

window.utils = Utils;

const App: React.FC = () => {
  const [guiSettings, setGuiSettings] = useLocalStorage('guiSettings', Utils.guiDefaultSettings);
  const [endpointUrl] = useLocalStorage('endpointUrl', 'api-s.anixsekai.com');
  const [utoken] = useLocalStorage('user_token', null);
  const [firstRun, setFirstRun] = useLocalStorage('first_run', true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewInfo, setViewInfo] = useState({
    viewportComponent: HomePage,
    args: null,
  });
  const [viewInfoOld, setViewInfoOld] = useState({
    viewportComponent: null,
    args: null,
  });
  const [scrollEvent, setScrollEvent] = useState<((e: Event) => void) | null>(null);

  useEffect(() => {
    document.body.className = `${guiSettings.theme}-theme`;
  }, [guiSettings.theme]);

  useEffect(() => {
    const parsedToken = utoken ? JSON.parse(utoken) : null;

    // Инициализация глобальных переменных
    window.baseSettings = window.settings?.getAll().then((res: any) => window.baseSettings = res);
    window.versions = window.prc?.getVersions().then((versions: any) => window.versions = versions);
    window.anixApi = new Anixart({
      token: parsedToken?.token,
      baseUrl: `https://${endpointUrl}`,
    }).endpoints;
    window.profileInfo = parsedToken
      ? window.anixApi.profile.info(parsedToken?.id).then((x: any) => window.profileInfo = x.profile)
      : null;
    window.profileSettings = {
      main: null,
      socials: null,
      login: null,
    };
    window.pageHistory = [];
    window.upscaleEnable = false;
    window.avaliableGPU = Utils.checkGPUSupport().then((res: boolean) => window.avaliableGPU = res);

    if (parsedToken) {
      window.anixApi.settings.getCurrentProfileSettings().then((x: any) => window.profileSettings.main = x);
      window.anixApi.settings.getSocial().then((x: any) => window.profileSettings.socials = x);
      window.anixApi.settings.getLoginInfo().then((x: any) => window.profileSettings.login = x);
    }

    window.setViewportScrollEvent = (callback: ((e: Event) => void) | null) => {
      setScrollEvent(() => callback);
    };

    window.updateViewportComponent = (page: any, args?: any, history = false) => {
      window.setViewportScrollEvent(null);
      setViewInfoOld(viewInfo);
      
      if (viewInfo.viewportComponent === page && 
          JSON.stringify(viewInfo.args) === JSON.stringify(args)) {
        return;
      }

      setViewInfo({
        viewportComponent: typeof page === 'number' ? getViewByIndex(page) : page,
        args: args ?? null,
      });

      if (page !== getViewByIndex(11) && page !== getViewByIndex(8)) {
        window.discordRPC?.setActivity({
          type: 3,
          state: "Ожидание...",
          largeImageKey: "anidesk-transparent",
          largeImageText: "AniDesk - Anixart Client",
          instance: true,
          buttons: [
            { label: "Ссылка на клиент", url: "https://anidesk.ds1nc.ru/" },
          ],
        });
      }

      if (!history && viewInfoOld.viewportComponent !== getViewByIndex(11)) {
        window.pageHistory.unshift({ page: viewInfoOld.viewportComponent, args: viewInfoOld.args });
      }
    };

    window.waitForElm = (selector: string) => {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector)!);
        }

        const observer = new MutationObserver(() => {
          if (document.querySelector(selector)) {
            observer.disconnect();
            resolve(document.querySelector(selector)!);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      });
    };

    window.discordRPC?.setActivity({
      type: 3,
      state: "Ожидание...",
      largeImageKey: "anidesk-transparent",
      largeImageText: "AniDesk - Anixart Client",
      instance: true,
      buttons: [{ label: "Ссылка на клиент", url: "https://anidesk.ds1nc.ru/" }],
    });
  }, [endpointUrl, utoken]);

  useEffect(() => {
    const handleResize = () => {
      setIsFullscreen(window.innerHeight === screen.height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getViewByIndex = (index: number) => {
    // Здесь будет маппинг индексов на компоненты
    const views = [
      HomePage, // 0
      // Добавить остальные компоненты по мере их создания
    ];
    return views[index] || HomePage;
  };

  return (
    <main>
      {!isFullscreen && <TitleBar />}
      <div className={`main-content ${isFullscreen ? 'fullscreen' : ''}`}>
        <LeftMenu 
          viewInfo={viewInfo}
          setViewInfo={setViewInfo}
          setViewInfoOld={setViewInfoOld}
        />
        <MetaInfo />
        <div
          id="viewport"
          className="unselectable"
          tabIndex={-1}
          onScroll={scrollEvent || undefined}
        >
          <viewInfo.viewportComponent args={viewInfo.args} />
          {firstRun && (
            <BaseModal
              modalComponent={FirstRunModal}
              canCloseOnBackground={false}
              showed={firstRun}
              modalSize={{ width: "700px", height: "500px" }}
              onCloseModal={() => setFirstRun(false)}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default App;