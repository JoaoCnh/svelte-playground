import { unslugify } from '$lib/unslugify';
import { mapDir } from '$lib/server/map-dir';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const images = import.meta.glob('$lib/assets/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}', {
		eager: true,
		import: 'default',
		query: {
			enhanced: true,
			w: '400;640;1280'
		}
	});

	const experiments = mapDir('src/routes/playground', (dirName) => ({
		name: dirName,
		label: unslugify(dirName),
		url: `/playground/${dirName}`,
		image: images[`/src/lib/assets/${dirName}.jpg`] as string
	}));

	return { experiments };
};
