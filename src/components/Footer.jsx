import React from 'react';
import '../css/global.css';

export const Footer = () => {
  return (
    <div className="footer">
      By{' '}
      <a href="https://dev.to/szenius" target="_blank" rel="noopener noreferrer">
        Sze Ying
      </a>{' '}
      |{' '}
      <a href="https://github.com/szenius/sgcovid19" target="_blank" rel="noopener noreferrer">
        Source code
      </a>
    </div>
  );
};
