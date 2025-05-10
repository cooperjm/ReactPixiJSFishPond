// src/hooks/useAssets.js - Updated version
import { useEffect, useState, useCallback } from 'react';
import { Assets } from 'pixi.js';

// Define the assets manifest
const manifest = {
  bundles: [
    {
      name: 'fish-pond-assets',
      assets: [
        { alias: 'overlay', src: '/assets/wave_overlay.png' },
        { alias: 'fish1', src: '/assets/fish1.png' },
        { alias: 'fish2', src: '/assets/fish2.png' },
        { alias: 'fish3', src: '/assets/fish3.png' },
        { alias: 'fish4', src: '/assets/fish4.png' },
        { alias: 'fish5', src: '/assets/fish5.png' },
        { alias: 'displacement-map', src: '/assets/displacement_map.png' },
        { alias: 'riverbottom', src: '/assets/riverbottom_result.webp' },
        { alias: 'background', src: '/assets/pond_background.jpg' }
      ],
    },
  ],
};

// Keep track of initialization across renders/components
let isAssetsInitialized = false;

export function useAssets() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Function to load assets - using useCallback to make it reusable
  const loadAssets = useCallback(async () => {
    try {
      console.log('Loading fish pond assets...');
      
      // Only initialize once
      if (!isAssetsInitialized) {
        console.log('Initializing Assets system');
        await Assets.init({ manifest });
        isAssetsInitialized = true;
      }

      // Load the assets from the bundle
      await Assets.loadBundle('fish-pond-assets');
      console.log('All assets loaded successfully');
      setAssetsLoaded(true);
      setLoadError(null);
    } catch (error) {
      console.error('Error loading assets:', error);
      setLoadError(error.message);
      setAssetsLoaded(false);
    }
  }, []);

  // Function to handle WebGL context restoration
  const handleContextRestoration = useCallback(async () => {
    console.log('WebGL context restored, reloading assets...');
    setAssetsLoaded(false);
    isAssetsInitialized = false; // Reset initialization flag
    await loadAssets();
  }, [loadAssets]);

  // Load assets on mount
  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  // Return both the loading state and functions for context handling
  return {
    assetsLoaded,
    loadError,
    reloadAssets: loadAssets,
    handleContextRestoration
  };
}