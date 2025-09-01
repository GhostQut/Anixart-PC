import React, { ReactNode } from 'react';
import AnimePoster from '../release/AnimePoster';
import Dot from './Dot';

interface AnimeFullRowCardProps {
  inModal?: boolean;
  anime: any;
  children?: ReactNode;
}

const AnimeFullRowCard: React.FC<AnimeFullRowCardProps> = ({ 
  inModal = false, 
  anime, 
  children 
}) => {
  return (
    <div 
      className="anime-full-row-card flex-row" 
      onClick={() => window.updateViewportComponent(8, { id: anime.id })}
    >
      <div className="full-row-anime-poster">
        <AnimePoster 
          size={{ width: 140, height: 205 }} 
          zIndex={inModal ? 2 : 0} 
          posterInfo={{ poster: anime.image, title: anime.title }} 
          shadow={true} 
          borderRadius={20} 
          posterStyle={anime.profile_list_status ?? 0}
        />
      </div>
      <div className="flex-column">
        <div className="anime-item-title">{anime.title_ru}</div>
        {children}
        <div className="anime-item-epCount flex-row">
          {window.utils?.returnEpisodeString(anime)} эп. 
          {window.utils?.returnEpisodeString(anime) !== "?" && anime.status?.id !== 3 && (
            <>
              <Dot size={{ width: 4, height: 4 }} />
              {anime.grade.toFixed(2)} ★
            </>
          )}
        </div>
        <div className="anime-item-description">{anime.description}...</div>
      </div>
    </div>
  );
};

export default AnimeFullRowCard;