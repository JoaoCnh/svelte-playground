import Root from './Chart.svelte';
import XAxis from './XAxis.svelte';
import YAxis from './YAxis.svelte';
import Bar from './Bar.svelte';

export const Chart = Object.assign(Root, {
	XAxis,
	YAxis,
	Bar
});
