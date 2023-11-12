<script lang="ts">
	import { afterUpdate, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ChartDimensions } from './types';

	type T = $$Generic<Record<string, any>>;

	export let data: Writable<T[]>;
	export let margin = { top: 20, right: 15, bottom: 20, left: 25 };

	let dimensions = writable<ChartDimensions>({ width: 0, height: 0 });

	setContext('data', data);
	setContext('margin', margin);
	setContext('dimensions', dimensions);
</script>

<div {...$$restProps} bind:offsetWidth={$dimensions.width} bind:offsetHeight={$dimensions.height}>
	<svg class="relative w-full h-full">
		{#if !!$dimensions.height && !!$dimensions.width}
			<slot />
		{/if}
	</svg>
</div>
