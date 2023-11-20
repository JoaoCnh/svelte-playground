import { writable } from 'svelte/store';

type Legend = {
	title: string;
	color: string;
};

export const legend = writable<Record<string, Legend>>({});

export type { Legend };
