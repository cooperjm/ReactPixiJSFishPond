// src/components/FishContainer.jsx
import React, { useRef /*, useEffect */ } from 'react'; // Keep useRef, may add useEffect later
import { Fish } from './Fish';

export function FishContainer() {
  // Ref for the PixiJS Container instance that holds the fish
  const containerRef = useRef(null);

  const numberOfFish = 10;

  const fishInstances = [...Array(numberOfFish).keys()];

  return (
    // This renders a PixiJS Container. Individual fish components will go inside here.
    <pixiContainer ref={containerRef}>
      {fishInstances.map((index) => (
         <Fish key={index} />
      ))}
    </pixiContainer>
  );
}