import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="center">
      <div className="lds-spinner">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;