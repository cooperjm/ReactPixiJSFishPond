// src/App.jsx
import React from 'react';
import { Application, useExtend } from '@pixi/react';
import { Container, Sprite, Graphics, TilingSprite } from 'pixi.js';
import { FishPond } from './components/FishPond';
import { useAssets } from './hooks/useAssets'; // We'll create this hook next

function App() {
  // --- PixiJS Setup with React Pixi ---

  // 1. Register PixiJS display objects as React components
  //    This allows us to use them like <pixiContainer>, <pixiSprite>, etc.
  useExtend({ Container, Sprite, Graphics, TilingSprite });

  // 2. Handle Asset Loading
  //    We need to load textures and other assets before rendering PixiJS content
  const assetsLoaded = useAssets(); // This hook will manage loading

  // Show a loading state until assets are ready
  if (!assetsLoaded) {
    return <div className="loading">Loading assets...</div>;
  }

  // --- Render the PixiJS Application and Content ---

  return (
    // This div can be used for basic page layout or background (CSS)
    <div className="app">
      {/* The Application component creates and manages the PixiJS renderer/stage */}
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundColor={0x1099bb}
        resizeTo={window}
      >
        <FishPond />
      </Application>
    </div>
  );
}

export default App;