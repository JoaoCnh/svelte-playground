<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { legend } from './legendStore';
	import type { ChartDimensions } from './types';

	type T = $$Generic<Record<string, any>>;

	export let data: T[];
	export let margin = { top: 20, right: 15, bottom: 20, left: 25 };

	const dataStore = writable(data);
	const dimensions = writable<ChartDimensions>({ width: 0, height: 0 });

	$: dataStore.set(data);

	setContext('data', dataStore);
	setContext('margin', margin);
	setContext('legend', legend);
	setContext('dimensions', dimensions);
</script>

<div {...$$restProps} bind:offsetWidth={$dimensions.width} bind:offsetHeight={$dimensions.height}>
	<slot name="top" />

	<svg class="relative w-full h-full">
		{#if !!$dimensions.height && !!$dimensions.width}
			<slot name="chart" />
		{/if}
	</svg>

	<slot name="bottom" />
</div>
