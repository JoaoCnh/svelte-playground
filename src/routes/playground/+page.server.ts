import { unslugify } from '$lib/unslugify';
import { mapDir } from '$lib/server/map-dir';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const experiments = mapDir('src/routes/playground', (dirName) => ({
		name: dirName,
		label: unslugify(dirName),
		url: `/playground/${dirName}`
	}));

	return { experiments };
};
