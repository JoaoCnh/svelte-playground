import { writable } from 'svelte/store';

type Toast = {
	type: 'info' | 'warning' | 'error' | 'success';
	text: string;
};

export const toast = writable<Toast | null>(null);

export type { Toast };
