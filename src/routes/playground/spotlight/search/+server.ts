import { json } from '@sveltejs/kit';
import * as search from '$lib/server/search';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q');

	if (!q || q.length === 0) return json({ groups: [] });

	return json(search.spotlightSearch(q));
};
