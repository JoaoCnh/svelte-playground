<script lang="ts">
	import { getContext } from 'svelte';
	import { getDimensionsStore, getXScaleStore, getXTicksStore } from './store';
	import type { Writable } from 'svelte/store';

	export let dataKey: string;

	type T = $$Generic<Record<string, any>>;

	const data = getContext<Writable<T[]>>('data');
	const xTicks = getXTicksStore();
	const xScale = getXScaleStore();
	const dimensions = getDimensionsStore();

	$: xTicks.set(new Set($data.map((point) => point[dataKey])));
	$: innerWidth = $dimensions.width - ($dimensions.marginLeft + $dimensions.marginRight);
	$: barWidth = innerWidth / $xTicks.size;
</script>

<g>
	{#each $xTicks.values() as tick, i}
		<g
			class="text-xs"
			style:text-anchor="middle"
			transform="translate({$xScale(i)},{$dimensions.height})"
		>
			<text x={barWidth / 2} y="-4">{tick}</text>
		</g>
	{/each}
</g>
