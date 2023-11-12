<script lang="ts">
	import { getContext } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import type { Writable } from 'svelte/store';
	import type { ChartDimensions, ChartMargin } from './types';

	export let dataKey: string;

	type T = $$Generic<Record<string, any>>;

	const data = getContext<Writable<T[]>>('data');
	const margin = getContext<ChartMargin>('margin');
	const dimensions = getContext<Writable<ChartDimensions>>('dimensions');

	$: xTicks = $data.map((point) => point[dataKey]);
	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([margin.left, $dimensions.width - margin.right]);
	$: innerWidth = $dimensions.width - (margin.left + margin.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

<g>
	{#each xTicks as tick, i}
		<g
			class="text-xs"
			style:text-anchor="middle"
			transform="translate({xScale(i)},{$dimensions.height})"
		>
			<text x={barWidth / 2} y="-4">{tick}</text>
		</g>
	{/each}
</g>
