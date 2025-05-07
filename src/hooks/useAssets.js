// src/hooks/useAssets.js
import { useEffect, useState } from 'react';
import { Assets } from 'pixi.js';

// Define the assets we want to load
// Keys are the names we'll use to reference them (e.g., Texture.from('overlay'))
// Values are the paths to the asset files
const manifest = {
	bundles: [
		{
			name: 'fish-pond-assets', // A name for this bundle of assets
			assets: [
				{
					alias: 'overlay', // The name we use to reference this asset
					src: '/assets/wave_overlay.png', // The path to the asset file
				},
				{ alias: 'fish1', src: '/assets/fish1.png' },
				{ alias: 'fish2', src: '/assets/fish2.png' },
				{ alias: 'fish3', src: '/assets/fish3.png' },
				{ alias: 'fish4', src: '/assets/fish4.png' },
				{ alias: 'fish5', src: '/assets/fish5.png' },
				{ alias: 'displacement-map', src: '/assets/displacement_map.png' },
				{ alias: 'riverbottom', src: '/assets/riverbottom_result.webp' },
			],
		},
	],
};


export function useAssets() {
	const [assetsLoaded, setAssetsLoaded] = useState(false);

	useEffect(() => {
		// Function to initialize and load assets
		const loadAssets = async () => {
			try {
        console.log("--- Debugging manifest in useAssets ---"); // Add this line
        console.log("Manifest variable:", manifest); // Add this line
        console.log("Type of manifest:", typeof manifest); // Add this line
        console.log("Is manifest null?", manifest === null); // Add this line
        console.log("Is manifest undefined?", manifest === undefined); // Add this line
        if (manifest && manifest.bundles) {
           console.log("Type of manifest.bundles:", typeof manifest.bundles); // Add this line
           console.log("Is manifest.bundles an array?", Array.isArray(manifest.bundles)); // Add this line
        }
        console.log("--- End debugging manifest ---"); // Add this line


				// Initialize the Assets class (PixiJS v8+)
				// This prepares it to load assets, setting base path etc.
				await Assets.init({ manifest }); // Pass our manifest here

				// Load the assets from the specified bundle(s)
				// If no bundles specified, it loads all assets in the manifest
				await Assets.loadBundle('fish-pond-assets');

				// Once loading is complete, update the state
				setAssetsLoaded(true);
			} catch (error) {
				console.error('Error loading assets:', error);
				// Handle error loading assets (e.g., show an error message)
			}
		};

		// Start loading assets when the component mounts
		loadAssets();

		// No cleanup needed for this simple loading example,
		// but you might add cleanup logic if you had ongoing processes.
	}, []); // The empty dependency array ensures this effect runs only once on mount

	// Return the loading state
	return assetsLoaded;
}
