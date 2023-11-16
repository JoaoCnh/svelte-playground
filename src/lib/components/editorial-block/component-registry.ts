import type { ComponentType } from 'svelte';
import type { Component } from './types';

import ImageLoader from './page-components/image-component/Loader.svelte';

type Registry = {
	[Type in Component['type']]: {
		loader?: ComponentType;
		getAsync: () => Promise<{ default: ComponentType }>;
	};
};

/**
 * This might not even be needed. Vite supports dynamic imports through variables.
 *
 * https://vitejs.dev/guide/features.html#dynamic-import
 *
 * So you could, in theory, create a convention for file names. But I prefer to be a little bit more verbose
 * and just have more control.
 */
export const componentRegistry: Registry = {
	image: {
		loader: ImageLoader,
		getAsync: () => import('./page-components/image-component/Image.svelte')
	},
	'another-one': {
		getAsync: () => import('./page-components/another-one/AnotherOne.svelte')
	}
};
