<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { dimensionsStore, setupStoresContext } from './store';

	type T = $$Generic<Record<string, any>>;

	export let data: T[];
	export let margin = { top: 20, right: 15, bottom: 20, left: 25 };

	setupStoresContext();

	const dataStore = writable(data);

	$: dataStore.set(data);

	setContext('data', dataStore);

	$: dimensionsStore.set({
		...$dimensionsStore,
		marginTop: margin.top,
		marginRight: margin.right,
		marginBottom: margin.bottom,
		marginLeft: margin.left
	});

	$: measured = !!$dimensionsStore.height && !!$dimensionsStore.width;
</script>

<div
	{...$$restProps}
	bind:offsetWidth={$dimensionsStore.width}
	bind:offsetHeight={$dimensionsStore.height}
>
	<slot name="top" />

	<svg class="relative w-full h-full">
		{#if measured}
			<slot name="chart" />
		{/if}
	</svg>

	<slot name="bottom" />
</div>
