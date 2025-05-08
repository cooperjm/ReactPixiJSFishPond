import React, { useRef, useEffect, useState } from 'react';
import { Texture } from 'pixi.js'; // Import Texture to get assets
import { WaterOverlay } from './WaterOverlay'; // Import the wavy overlay component
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
      }

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      }
   }, []);

   const backgroundTexture = Texture.from('background');

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
         <FishContainer />
         <WaterOverlay speedX={40} speedY={20}/>
      </pixiContainer>
   );
}