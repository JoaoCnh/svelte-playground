<script lang="ts">
	import { generateYAxisTicks } from './generateYAxisTicks';
	import { getContext } from 'svelte';
	import { getDimensionsStore, getXScaleStore, getYScaleStore, getYTicksStore } from './store';
	import { updateLegend } from './updateLegend';
	import type { Writable } from 'svelte/store';

	export let name: string;
	export let dataKey: string;
	export let color: string = '#06b6d4';

	type T = $$Generic<Record<string, any>>;

	const data = getContext<Writable<T[]>>('data');
	const xScale = getXScaleStore();
	const yTicks = getYTicksStore();
	const yScale = getYScaleStore();
	const dimensions = getDimensionsStore();

	const { setLegends } = updateLegend(dataKey);

	$: setLegends({ title: name, color });
	$: dataPoints = $data.map((point) => point[dataKey]);
	$: yTicks.update((set) => new Set([...Array.from(set.values()), ...dataPoints]));
	$: innerWidth = $dimensions.width - ($dimensions.marginLeft + $dimensions.marginRight);
	$: barWidth = innerWidth / dataPoints.length;
	$: points = dataPoints
		.map((dataPoint, idx) => [$xScale(idx) + 2 + barWidth / 2, $yScale(dataPoint)].join(','))
		.join(' ');
</script>

<g>
	<polyline {points} fill="none" stroke={color} stroke-width="2" />
</g>
