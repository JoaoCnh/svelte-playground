<script lang="ts">
	import { getContext } from 'svelte';
	import { updateLegend } from './updateLegend';
	import { updateYAxis } from './updateYAxis';
	import { getDimensionsStore, getXScaleStore, getYScaleStore } from './store';
	import type { Writable } from 'svelte/store';

	export let name: string;
	export let dataKey: string;
	export let fill: string = '#a11';

	type T = $$Generic<Record<string, any>>;

	const data = getContext<Writable<T[]>>('data');
	const xScale = getXScaleStore();
	const yScale = getYScaleStore();
	const dimensions = getDimensionsStore();

	const { setLegends } = updateLegend(dataKey);
	const { setYTicks } = updateYAxis(name);

	$: dataPoints = $data.map((point) => point[dataKey]);
	$: setLegends({ title: name, color: fill });
	$: setYTicks(dataPoints);
	$: innerWidth = $dimensions.width - ($dimensions.marginLeft + $dimensions.marginRight);
	$: barWidth = innerWidth / dataPoints.length;
</script>

<g>
	{#each dataPoints as dataPoint, i}
		<rect
			x={$xScale(i) + 2}
			y={$yScale(dataPoint)}
			width={barWidth - 4}
			height={$yScale(0) - $yScale(dataPoint)}
			{fill}
		/>
	{/each}
</g>
