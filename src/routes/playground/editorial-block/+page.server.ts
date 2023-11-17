import * as cms from '$lib/server/fake-cms';
import type { ImageComponent } from '$lib/components/editorial-block/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const aboveTheFold: ImageComponent = {
		type: 'image',
		src: 'https://picsum.photos/seed/picsum/1000/600',
		ratio: 'vh'
	};

	return {
		components: [
			aboveTheFold,
			cms.getComponent('xpto1'),
			cms.getComponent('xpto2', 3000),
			cms.getComponent('xpto3', 1000),
			cms.getComponent('xpto4', 5000)
		]
	};
};
