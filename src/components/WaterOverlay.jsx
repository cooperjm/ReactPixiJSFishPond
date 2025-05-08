// src/components/WaterOverlay.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Texture } from 'pixi.js';
import { gsap } from 'gsap';

// Define the props the component accepts
export function WaterOverlay({ speedX = -40, speedY = -40 }) { // Added props with default values
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect to set up and manage the GSAP animation - MODIFIED for Props
  useEffect(() => {
    const tilingSprite = tilingSpriteRef.current;
    const overlayTexture = Texture.from('overlay');

    // Ensure sprite and texture are available
    if (!tilingSprite || !overlayTexture) {
      return;
    }

    // Kill any existing tweens on the tilePosition to prevent conflicts
    // when props change and the effect re-runs.
    gsap.killTweensOf(tilingSprite.tilePosition);

    // --- GSAP Animation Setup based on Props ---

    const tweens = []; // Array to hold our tweens for cleanup

    // Animate horizontally if speedX is not zero
    if (speedX !== 0) {
      const durationX = overlayTexture.width / Math.abs(speedX); // Duration for one full tile scroll horizontally
      const directionX = speedX < 0 ? '-=' : '+='; // Determine direction based on speed sign

      const tweenX = gsap.to(tilingSprite.tilePosition, {
        x: directionX + overlayTexture.width, // Animate by one texture width in the specified direction
        duration: durationX, // Use calculated duration
        repeat: -1, // Repeat infinitely
        ease: 'linear', // Constant speed
      });
      tweens.push(tweenX);
    }

    // Animate vertically if speedY is not zero
    if (speedY !== 0) {
        const durationY = overlayTexture.height / Math.abs(speedY); // Duration for one full tile scroll vertically
        const directionY = speedY < 0 ? '-=' : '+='; // Determine direction based on speed sign

        const tweenY = gsap.to(tilingSprite.tilePosition, {
            y: directionY + overlayTexture.height, // Animate by one texture height in the specified direction
            duration: durationY, // Use calculated duration
            repeat: -1, // Repeat infinitely
            ease: 'linear', // Constant speed
        });
        tweens.push(tweenY);
    }


    // --- GSAP Animation Cleanup ---
    return () => {
      // Kill all created tweens when the component unmounts or props change
      tweens.forEach(tween => tween.kill());
    };

  }, [speedX, speedY]); // ADDED speedX and speedY to the dependency array!

  // Render the PixiJS TilingSprite Component
  const overlayTexture = Texture.from('overlay');

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