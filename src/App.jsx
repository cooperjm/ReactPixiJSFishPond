// src/App.jsx
import React, { useCallback } from 'react';
import { Application, useExtend } from '@pixi/react';
import { Container, Sprite, Graphics, TilingSprite } from 'pixi.js';
import { FishPond } from './components/FishPond';
import { useAssets } from './hooks/useAssets';

function App() {
  // Register PixiJS display objects as React components
  useExtend({ Container, Sprite, Graphics, TilingSprite });

  // Handle Asset Loading
  const { assetsLoaded, loadError, handleContextRestoration } = useAssets();
  
  // Handle WebGL context loss
  const handleContextLost = useCallback((event) => {
    console.log('WebGL context lost, preventing default behavior');
    event.preventDefault(); // Prevents default behavior that might disrupt recovery
  }, []);

  // Show loading state or error
  if (loadError) {
    return <div className="error">Error loading assets: {loadError}</div>;
  }
  
  if (!assetsLoaded) {
    return <div className="loading">Loading fish pond assets...</div>;
  }

  return (
    <div className="app">
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundColor={0x1099bb}
        resizeTo={window}
        options={{
          antialias: true,
          autoDensity: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
        onContextLost={handleContextLost}
        onContextRestored={handleContextRestoration}
      >
        <FishPond />
      </Application>
    </div>
  );
}

export default App;