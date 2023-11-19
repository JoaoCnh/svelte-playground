import Fuse, { type FuseResult } from 'fuse.js';
import { unslugify } from '$lib/unslugify';
import { mapDir } from '$lib/server/map-dir';
import type { SearchResult, SearchResultGroupItem } from '$lib/services/search/types';

const experiments = mapDir('src/routes/playground', (dirName) => ({
	icon: dirName,
	label: unslugify(dirName),
	url: `/playground/${dirName}`
}));

const playgrounds = [
	{ icon: 'svelte', label: 'svelte playground', url: 'https://svelte-playground-iota.vercel.app/' },
	{ icon: 'lit', label: 'lit playground', url: 'https://lit-playground-chi.vercel.app/' }
];

const fuzzyOptions = { keys: [{ name: 'label', weight: 2 }, 'url'] };

const fuzzyExperiments = new Fuse(experiments, fuzzyOptions);
const fuzzyPlaygrounds = new Fuse(playgrounds, fuzzyOptions);

function transformFuseResult({
	item
}: FuseResult<{ icon: string; label: string; url: string }>): SearchResultGroupItem {
	return {
		icon: item.icon,
		label: item.label,
		url: item.url
	};
}

export function spotlightSearch(pattern: string): SearchResult {
	const experiments = fuzzyExperiments.search(pattern).map(transformFuseResult);
	const playgrounds = fuzzyPlaygrounds.search(pattern).map(transformFuseResult);

	return {
		groups: [
			{ title: 'experiments', items: experiments },
			{ title: 'playgrounds', items: playgrounds }
		]
	};
}
