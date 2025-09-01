import React, { useEffect } from 'react';

interface MetaInfoProps {
  subTitle?: string;
  title?: string;
}

const MetaInfo: React.FC<MetaInfoProps> = ({ subTitle, title = "AniDesk" }) => {
  useEffect(() => {
    document.title = subTitle ? `${subTitle} - ${title}` : title;
  }, [subTitle, title]);

  return null;
};

export default MetaInfo;