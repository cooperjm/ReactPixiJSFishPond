// src/components/Fish.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Sprite, Texture } from 'pixi.js'; // Import Sprite and Texture

// Helper function to get a random fish texture alias
const getRandomFishTextureAlias = () => {
    const fishAliases = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5'];
    const randomIndex = Math.floor(Math.random() * fishAliases.length);

    return fishAliases[randomIndex];
};

export function Fish() {
  // Ref to hold the PixiJS Sprite instance for this fish
  const fishRef = useRef(null);

  // State to hold the randomly selected texture alias
  const [textureAlias] = useState(getRandomFishTextureAlias());

  // Get the texture for the selected alias
  const fishTexture = Texture.from(textureAlias);

  // Set initial random position and rotation (we'll add movement later)
  // Use useState so these values are stable for this instance
  const [initialPos] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });

  const [initialRotation] = useState(Math.random() * Math.PI * 2); // Random rotation in radians

  // We can add effects here later for animation (GSAP or Ticker)

  // Ensure texture is loaded before rendering
   // if (!fishTexture || !fishTexture.baseTexture.valid) {
   //     console.warn(`Fish texture not found or invalid for alias: ${textureAlias}`);
   //     return null;
   // }

   console.log(fishTexture)


  return (
    // Render a PixiJS Sprite for the fish
    // We are making it interactive so we can add click/tap events later
    <pixiSprite
      ref={fishRef} // Attach the ref
      texture={fishTexture} // Assign the random fish texture
      x={initialPos.x} // Set initial random position
      y={initialPos.y}
      rotation={initialRotation} // Set initial random rotation
      anchor={0.5} // Set anchor to the center of the sprite (makes position and rotation centered)
      // Initial scale can be set here too if needed
      // scale={0.8}
      interactive={true} // Enable interaction events
      cursor="pointer" // Show pointer cursor on hover
      // You can add event handlers here, e.g.:
      // click={(event) => console.log('Fish clicked!', textureAlias, event)}
      // tap={(event) => console.log('Fish tapped!', textureAlias, event)}
    />
  );
}


