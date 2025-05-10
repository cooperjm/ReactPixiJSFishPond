// src/components/FishContainer.jsx
import React, { useRef } from 'react';
import { Fish } from './Fish';

export function FishContainer({ count = 10 }) {
  // Container reference
  const containerRef = useRef(null);
  
  // Create array for multiple fish
  const fishInstances = [...Array(count).keys()];

  return (
    <pixiContainer ref={containerRef}>
      {fishInstances.map((index) => (
        <Fish key={index} />
      ))}
    </pixiContainer>
  );
}