// src/components/Fish.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Sprite, Assets, Texture } from 'pixi.js';

// Helper function to get a random fish texture alias
const getRandomFishTextureAlias = () => {
    const fishAliases = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5'];
    const randomIndex = Math.floor(Math.random() * fishAliases.length);
    return fishAliases[randomIndex];
};

// Preload all fish textures
const fishTextures = {};
const preloadTextures = async () => {
    const fishAliases = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5'];
    
    // Create an array of promises for loading each texture
    const texturePromises = fishAliases.map(async (alias) => {
        // Use the Assets API for more reliable loading
        const texture = await Assets.load(`/assets/${alias}.png`);
        fishTextures[alias] = texture;
        console.log(`Preloaded texture for ${alias}`);
        return texture;
    });
    
    // Wait for all textures to load
    await Promise.all(texturePromises);
    console.log("All fish textures preloaded successfully");
};

// Call preload outside component to start loading immediately
preloadTextures().catch(err => console.error("Error preloading textures:", err));

export function Fish() {
  const fishRef = useRef(null);
  const [textureAlias] = useState(getRandomFishTextureAlias());
  const [initialPos] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });
  const [initialRotation] = useState(Math.random() * Math.PI * 2);
  const [isTextureReady, setIsTextureReady] = useState(false);

  useEffect(() => {
    // Check if the texture is already preloaded
    if (fishTextures[textureAlias]) {
      console.log(`Texture ${textureAlias} already preloaded, setting ready state`);
      setIsTextureReady(true);
      return;
    }

    // If not preloaded yet, load it specifically
    console.log(`Texture ${textureAlias} not preloaded yet, loading now`);
    Assets.load(`/assets/${textureAlias}.png`)
      .then(texture => {
        fishTextures[textureAlias] = texture;
        console.log(`Loaded texture for ${textureAlias}`);
        setIsTextureReady(true);
      })
      .catch(error => {
        console.error(`Failed to load texture for ${textureAlias}:`, error);
      });
      
    // No cleanup needed as we're using the Assets API
  }, [textureAlias]);

  // Only render if the texture is ready
  if (!isTextureReady || !fishTextures[textureAlias]) {
    return null;
  }

  return (
    <pixiSprite
      ref={fishRef}
      texture={fishTextures[textureAlias]}
      x={initialPos.x}
      y={initialPos.y}
      rotation={initialRotation}
      anchor={0.5}
      interactive={true}
      cursor="pointer"
    />
  );
}