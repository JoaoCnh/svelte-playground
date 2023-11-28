import { onDestroy } from 'svelte';
import { getYTicksStore } from './store';

export function updateYAxis(name: string) {
	const yTicks = getYTicksStore();

	onDestroy(() => {
		yTicks.update((yTicks) => {
			const copy = { ...yTicks };
			delete copy[name];
			return copy;
		});
	});

	return {
		setYTicks: (dataPoints: number[]) => {
			yTicks.update((ticks) => ({ ...ticks, [name]: dataPoints }));
		}
	};
}
