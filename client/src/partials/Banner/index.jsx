import default_banner_bg from '@assets/images/default_banner_bg.jpg';
import React from 'react';

export function Banner({ label = null, noLabel = false, bgImage = null }) {
  return (
    <div
      className="hidden md:flex justify-center items-center min-h-96 parallax-banner"
      style={{
        backgroundImage: `url(${bgImage || default_banner_bg})`,
        backgroundSize: 'cover',
        // -100 top
        backgroundPosition: "0px -15rem",

        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Parallax effect
        backgroundColor: !noLabel ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        backgroundBlendMode: 'darken',
      }}
    >
      {label && !noLabel && (
        <h1 className="text-5xl font-display text-white">{label}</h1>
      )}
    </div>
  );
}