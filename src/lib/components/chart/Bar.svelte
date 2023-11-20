<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import { legend } from './legendStore';
	import { generateYAxisTicks } from './generateYAxisTicks';
	import type { Writable } from 'svelte/store';
	import type { ChartDimensions, ChartMargin } from './types';

	export let name: string;
	export let dataKey: string;
	export let fill: string = '#a11';

	type T = $$Generic<Record<string, any>>;

	const data = getContext<Writable<T[]>>('data');
	const margin = getContext<ChartMargin>('margin');
	const dimensions = getContext<Writable<ChartDimensions>>('dimensions');

	$: legend.update((legends) => ({ ...legends, [dataKey]: { title: name, color: fill } }));
	$: dataPoints = $data.map((point) => point[dataKey]);
	$: xScale = scaleLinear()
		.domain([0, dataPoints.length])
		.range([margin.left, $dimensions.width - margin.right]);
	$: innerWidth = $dimensions.width - (margin.left + margin.right);
	$: barWidth = innerWidth / dataPoints.length;
	$: yTicks = generateYAxisTicks($data, dataKey);
	$: maxYTick = Math.max(...yTicks);
	$: yScale = scaleLinear()
		.domain([0, maxYTick])
		.range([$dimensions.height - margin.bottom, margin.top]);

	onDestroy(() => {
		legend.update((legends) => {
			const copy = { ...legends };
			delete copy[dataKey];
			return copy;
		});
	});
</script>

<g>
	{#each dataPoints as dataPoint, i}
		<rect
			x={xScale(i) + 2}
			y={yScale(dataPoint)}
			width={barWidth - 4}
			height={yScale(0) - yScale(dataPoint)}
			{fill}
		/>
	{/each}
</g>
