import Root from './Chart.svelte';
import XAxis from './XAxis.svelte';
import YAxis from './YAxis.svelte';
import Bar from './Bar.svelte';
import Line from './Line.svelte';
import Legend from './Legend.svelte';

export const Chart = Object.assign(Root, {
	XAxis,
	YAxis,
	Bar,
	Line,
	Legend
});
