// src/components/FishPond.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Assets } from 'pixi.js';
import { WaterOverlay } from './WaterOverlay';
import { FishContainer } from './FishContainer';

export function FishPond() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get assets from the central asset system
  const backgroundTexture = Assets.get('background');
  
  if (!backgroundTexture) {
    console.warn("Background texture not found in FishPond!");
    return null;
  }

  return (
    <pixiContainer ref={containerRef}>
      <pixiSprite 
        texture={backgroundTexture}
        width={dimensions.width}
        height={dimensions.height}
        x={0}
        y={0}
      />
      <FishContainer count={15} />
      <WaterOverlay speedX={40} speedY={20} />
    </pixiContainer>
  );
}