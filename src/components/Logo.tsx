import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative">
        <svg width="24" height="24" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M4.5 51.5H48.5C52.1 51.5 53 48.8333 53 47.5V22.5C53 19.7 51.6667 18 51 17.5C45.3333 13 33.4 3.5 31 1.5C28.6 -0.499999 25 -0.500001 22.5 1.5C19.1667 4.16667 6.8 13.9 1.99999 17.5C0 19 0.166667 21.1667 0 22.5V46.5C0 50.1 3 51.3333 4.5 51.5Z" fill="#66ADF6"/>
          <path d="M16.5 29H10C12.4 40.2 22.1667 42.6667 26.5 42.5C29.1667 40.6667 32.4 37 26 37C19.6 37 17 31.6667 16.5 29Z" fill="black"/>
          <path d="M36.5338 29H43.0338C40.6338 40.2 30.8333 42.6667 26.5 42.5C23.8333 40.6667 20.6338 37 27.0338 37C33.4338 37 36.0338 31.6667 36.5338 29Z" fill="black"/>
        </svg>
      </div>
    </Link>
  );
}