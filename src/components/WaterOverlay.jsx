// src/components/WaterOverlay.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Assets } from 'pixi.js';
import { gsap } from 'gsap';

export function WaterOverlay({ speedX = -40, speedY = -40 }) {
  const tilingSpriteRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const tilingSprite = tilingSpriteRef.current;
    if (!tilingSprite) return;

    // Get texture from central asset system
    const overlayTexture = Assets.get('overlay');
    if (!overlayTexture) return;

    // Kill any existing tweens to prevent conflicts
    gsap.killTweensOf(tilingSprite.tilePosition);

    const tweens = [];

    // Animate horizontally if speedX is not zero
    if (speedX !== 0) {
      const durationX = overlayTexture.width / Math.abs(speedX);
      const directionX = speedX < 0 ? '-=' : '+=';

      const tweenX = gsap.to(tilingSprite.tilePosition, {
        x: directionX + overlayTexture.width,
        duration: durationX,
        repeat: -1,
        ease: 'linear',
      });
      tweens.push(tweenX);
    }

    // Animate vertically if speedY is not zero
    if (speedY !== 0) {
      const durationY = overlayTexture.height / Math.abs(speedY);
      const directionY = speedY < 0 ? '-=' : '+=';

      const tweenY = gsap.to(tilingSprite.tilePosition, {
        y: directionY + overlayTexture.height,
        duration: durationY,
        repeat: -1,
        ease: 'linear',
      });
      tweens.push(tweenY);
    }

    return () => tweens.forEach(tween => tween.kill());
  }, [speedX, speedY]);

  // Get overlay texture from central asset system
  const overlayTexture = Assets.get('overlay');
  
  if (!overlayTexture) {
    console.warn("Overlay texture not found for rendering!");
    return null;
  }

  return (
    <pixiTilingSprite
      ref={tilingSpriteRef}
      texture={overlayTexture}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}