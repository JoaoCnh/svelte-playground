import { onDestroy } from 'svelte';
import { getLegendStore } from './store';

type SetLegendsOptions = {
	title: string;
	color: string;
};

export function updateLegend(dataKey: string) {
	const legendStore = getLegendStore();

	onDestroy(() => {
		legendStore.update((legends) => {
			const copy = { ...legends };
			delete copy[dataKey];
			return copy;
		});
	});

	return {
		setLegends: ({ title, color }: SetLegendsOptions) => {
			legendStore.update((legends) => ({ ...legends, [dataKey]: { title, color } }));
		}
	};
}
