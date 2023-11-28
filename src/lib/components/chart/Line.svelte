<script lang="ts">
	import { getContext } from 'svelte';
	import { getDimensionsStore, getXScaleStore, getYScaleStore } from './store';
	import { updateYAxis } from './updateYAxis';
	import { updateLegend } from './updateLegend';
	import type { Writable } from 'svelte/store';

	export let name: string;
	export let dataKey: string;
	export let color: string = '#06b6d4';

	type T = $$Generic<Record<string, any>>;

	const data = getContext<Writable<T[]>>('data');
	const xScale = getXScaleStore();
	const yScale = getYScaleStore();
	const dimensions = getDimensionsStore();

	const { setLegends } = updateLegend(dataKey);
	const { setYTicks } = updateYAxis(name);

	$: dataPoints = $data.map((point) => point[dataKey]);
	$: setLegends({ title: name, color });
	$: setYTicks(dataPoints);
	$: innerWidth = $dimensions.width - ($dimensions.marginLeft + $dimensions.marginRight);
	$: barWidth = innerWidth / dataPoints.length;
	$: points = dataPoints
		.map((dataPoint, idx) => [$xScale(idx) + 2 + barWidth / 2, $yScale(dataPoint)].join(','))
		.join(' ');
</script>

<g>
	<polyline {points} fill="none" stroke={color} stroke-width="2" />
</g>
