import Fuse, { type FuseResult } from 'fuse.js';
import type { SearchResult, SearchResultGroupItem } from '$lib/services/search/types';

// We cannot use map dir here because Vercel deploys the serverless endpoint which won't have access to the routes folder
// Let's imagine this is a fake search index
const experiments = [
	{ icon: null, label: 'actions', url: '/playground/actions' },
	{ icon: 'apple', label: 'apple sequence', url: '/playground/apple-sequence' },
	{ icon: null, label: 'aspect ratio', url: '/playground/aspect-ratio' },
	{ icon: null, label: 'basic animations', url: '/playground/basic-animations' },
	{ icon: null, label: 'carousel', url: '/playground/carousel' },
	{ icon: null, label: 'context', url: '/playground/context' },
	{ icon: null, label: 'editorial block', url: '/playground/editorial-block' },
	{ icon: null, label: 'chart', url: '/playground/chart' },
	{ icon: null, label: 'card link', url: '/playground/card-link' },
	{ icon: null, label: 'polymorphism', url: '/playground/polymorphism' },
	{ icon: null, label: 'slots', url: '/playground/slots' },
	{ icon: null, label: 'stores', url: '/playground/stores' },
	{ icon: null, label: 'toast', url: '/playground/toast' },
	{ icon: null, label: 'transitions', url: '/playground/transitions' }
];

const playgrounds = [
	{ icon: 'svelte', label: 'svelte playground', url: 'https://svelte-playground-iota.vercel.app/' },
	{ icon: 'lit', label: 'lit playground', url: 'https://lit-playground-chi.vercel.app/' }
];

const fuzzyOptions = { keys: [{ name: 'label', weight: 2 }, 'url'] };

const fuzzyExperiments = new Fuse(experiments, fuzzyOptions);
const fuzzyPlaygrounds = new Fuse(playgrounds, fuzzyOptions);

function transformFuseResult({
	item
}: FuseResult<{ icon: string | null; label: string; url: string }>): SearchResultGroupItem {
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
