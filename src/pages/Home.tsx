import React, { useState, useEffect } from 'react';
import AnimeRowItem from '../components/elements/AnimeFullRowCard';
import MetaInfo from '../components/gui/MetaInfo';
import Preloader from '../components/gui/Preloader';

const Home: React.FC = () => {
  const [page, setPage] = useState(0);
  const [typeReleases, setTypeReleases] = useState(0);
  const [filterArgs, setFilterArgs] = useState({ sort: 0, status_id: null, category_id: null });
  const [allData, setAllData] = useState<any[]>([]);
  const [firstData, setFirstData] = useState<Promise<any> | null>(null);
  const [updateInfo, setUpdateInfo] = useState(false);

  useEffect(() => {
    setFirstData(window.anixApi?.release.filter(page, filterArgs, true));
  }, []);

  const getMainPage = async () => {
    const data = await window.anixApi.release.filter(page, filterArgs, true);
    setAllData(prev => [...prev, ...data.content]);
    setUpdateInfo(false);
  };

  const setReleasesType = (type: number) => {
    if (typeReleases === type) return;
    
    const viewport = document.getElementById("viewport");
    setTypeReleases(type);
    setPage(0);
    setAllData([]);
    
    let newFilterArgs = { ...filterArgs };
    
    switch (type) {
      case 0:
        newFilterArgs = { sort: 0, status_id: null, category_id: null };
        break;
      case 1:
        newFilterArgs.status_id = 2;
        newFilterArgs.category_id = null;
        break;
      case 2:
        newFilterArgs.status_id = 3;
        newFilterArgs.category_id = null;
        break;
      case 3:
        newFilterArgs.status_id = 1;
        newFilterArgs.category_id = null;
        break;
      case 4:
        newFilterArgs.category_id = 2;
        newFilterArgs.status_id = null;
        break;
    }

    setFilterArgs(newFilterArgs);
    setFirstData(window.anixApi.release.filter(0, newFilterArgs, true));
    if (viewport) viewport.scrollTop = 0;
  };

  useEffect(() => {
    const scrollHandler = async (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop >= target.scrollHeight - 2000 && !updateInfo) {
        setUpdateInfo(true);
        setPage(prev => prev + 1);
        await getMainPage();
      }
    };

    window.setViewportScrollEvent(scrollHandler);
    
    return () => {
      window.setViewportScrollEvent(null);
    };
  }, [updateInfo, page, filterArgs]);

  return (
    <>
      <MetaInfo subTitle="Главная" />
      
      <div className="releases-type flex-row">
        <button
          className={`releases-type-title flex-column ${typeReleases === 0 ? 'selected' : ''}`}
          onClick={() => setReleasesType(0)}
        >
          Последние
        </button>
        <button
          className={`releases-type-title flex-column ${typeReleases === 1 ? 'selected' : ''}`}
          onClick={() => setReleasesType(1)}
        >
          Онгоинги
        </button>
        <button
          className={`releases-type-title flex-column ${typeReleases === 2 ? 'selected' : ''}`}
          onClick={() => setReleasesType(2)}
        >
          Анонсы
        </button>
        <button
          className={`releases-type-title flex-column ${typeReleases === 3 ? 'selected' : ''}`}
          onClick={() => setReleasesType(3)}
        >
          Завершенные
        </button>
        <button
          className={`releases-type-title flex-column ${typeReleases === 4 ? 'selected' : ''}`}
          onClick={() => setReleasesType(4)}
        >
          Фильмы
        </button>
      </div>
      
      <div className="releases-container flex-column">
        {firstData ? (
          <React.Suspense fallback={<Preloader />}>
            <HomeContent firstData={firstData} allData={allData} />
          </React.Suspense>
        ) : (
          <Preloader />
        )}
      </div>
    </>
  );
};

const HomeContent: React.FC<{ firstData: Promise<any>; allData: any[] }> = ({ firstData, allData }) => {
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firstData.then(data => {
      setReleases(data.content);
      setLoading(false);
    });
  }, [firstData]);

  if (loading) return <Preloader />;

  return (
    <>
      {releases.map((release, index) => (
        <AnimeRowItem key={`first-${index}`} anime={release} />
      ))}
      {allData.map((release, index) => (
        <AnimeRowItem key={`all-${index}`} anime={release} />
      ))}
    </>
  );
};

export default Home;