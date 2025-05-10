// src/components/Fish.jsx - Corrected with proper turning and delta time
import React, { useRef, useState, useEffect } from 'react';
import { Assets } from 'pixi.js';
import { gsap } from 'gsap';

// Helper functions
const getRandomFishTextureAlias = () => {
  const fishAliases = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5'];
  const randomIndex = Math.floor(Math.random() * fishAliases.length);
  return fishAliases[randomIndex];
};

const getRandomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

export function Fish() {
  const fishRef = useRef(null);
  const [textureAlias] = useState(getRandomFishTextureAlias());
  
  // Initial fish state with more balanced parameters
  const [fishState] = useState(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    direction: Math.random() * Math.PI * 2,
    // Much smaller turn speed to prevent tight circles
    turnSpeed: getRandomBetween(-0.5, 0.5),
    // Slightly faster speed
    speed: getRandomBetween(1.5, 3.5),
    scale: getRandomBetween(0.7, 1.3)
  }));

  // Animation using GSAP ticker
  useEffect(() => {
    if (!fishRef.current) return;
    
    const fish = fishRef.current;
    
    // Set initial position
    gsap.set(fish, {
      x: fishState.x,
      y: fishState.y,
      rotation: -fishState.direction - Math.PI / 2,
      scale: fishState.scale
    });
    
    // Current state tracking
    let currentX = fishState.x;
    let currentY = fishState.y;
    let currentDirection = fishState.direction;
    let currentTurnSpeed = fishState.turnSpeed;
    
    // Define stage boundaries with padding
    const stagePadding = 100;
    
    // Periodically change turn speed to make movement more natural
    // But with much smaller changes to prevent tight circles
    const changeTurnDirection = () => {
      // Get a new turn speed, but keep it small
      currentTurnSpeed = getRandomBetween(-0.5, 0.5);
      
      // Schedule next change after a longer time
      gsap.delayedCall(getRandomBetween(3, 8), changeTurnDirection);
    };
    
    // Start the turn direction change cycle
    changeTurnDirection();
    
    // Create a ticker for continuous animation
    const ticker = gsap.ticker.add((time, deltaTime) => {
      // Convert deltaTime to seconds
      const delta = deltaTime / 1000;
      
      // Update direction using current turn speed and delta time
      // Use a small multiplier to make turns gentle
      currentDirection += currentTurnSpeed * 0.01 * delta * 60;
      
      // Update position based on direction, speed and delta time
      currentX += Math.sin(currentDirection) * fishState.speed * delta * 60;
      currentY += Math.cos(currentDirection) * fishState.speed * delta * 60;
      
      // Apply rotation
      const rotation = -currentDirection - Math.PI / 2;
      
      // Handle screen wrapping
      const boundWidth = window.innerWidth + stagePadding * 2;
      const boundHeight = window.innerHeight + stagePadding * 2;
      
      // Wrap position when going off-screen
      if (currentX < -stagePadding) {
        currentX += boundWidth;
      }
      if (currentX > window.innerWidth + stagePadding) {
        currentX -= boundWidth;
      }
      if (currentY < -stagePadding) {
        currentY += boundHeight;
      }
      if (currentY > window.innerHeight + stagePadding) {
        currentY -= boundHeight;
      }
      
      // Apply the updates to the fish sprite
      fish.x = currentX;
      fish.y = currentY;
      fish.rotation = rotation;
    });
    
    // Handle window resize
    const handleResize = () => {
      // No need to reset fish position - the wrapping logic will handle it
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('resize', handleResize);
    };
  }, [fishState]);

  // Get fish texture
  const fishTexture = Assets.get(textureAlias);

  if (!fishTexture) {
    console.warn(`Failed to get texture for ${textureAlias}`);
    return null;
  }

  return (
    <pixiSprite
      ref={fishRef}
      texture={fishTexture}
      anchor={0.5}
      interactive={true}
      cursor="pointer"
    />
  );
}