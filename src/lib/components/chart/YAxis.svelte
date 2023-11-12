<script lang="ts">
	import { getContext } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import { generateYAxisTicks } from './generateYAxisTicks';
	import type { Writable } from 'svelte/store';
	import type { ChartDimensions, ChartMargin } from './types';

	export let dataKey: string;

	type T = $$Generic<Record<string, any>>;

	const data = getContext<Writable<T[]>>('data');
	const margin = getContext<ChartMargin>('margin');
	const dimensions = getContext<Writable<ChartDimensions>>('dimensions');

	$: yTicks = generateYAxisTicks($data, dataKey);
	$: maxYTick = Math.max(...yTicks);
	$: yScale = scaleLinear()
		.domain([0, maxYTick])
		.range([$dimensions.height - margin.bottom, margin.top]);
</script>

<g>
	{#each yTicks as tick}
		<g class="text-xs" transform="translate(0, {yScale(tick)})">
			<line x2="100%" class="stroke-gray-500" style:stroke-dash-array="2" />
			<text y="-4">{tick}</text>
		</g>
	{/each}
</g>
