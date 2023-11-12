<script lang="ts">
	import { writable } from 'svelte/store';
	import { Chart } from '$lib/components/chart';
	import Switch from '$lib/components/switch/Switch.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';

	let data = writable([
		{ year: 1990, birthrate: 16.7 },
		{ year: 1995, birthrate: 14.6 },
		{ year: 2000, birthrate: 14.4 },
		{ year: 2005, birthrate: 14 },
		{ year: 2010, birthrate: 13 },
		{ year: 2015, birthrate: 12.4 }
	]);

	let showXAxis = true;
	let showYAxis = true;
</script>

<section id="context" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="context"
		description="Exploring Svelte's Context API by building a composable Chart component."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/chart/index.ts"
	/>

	<div class="flex flex-col items-start md:flex-row md:items-center gap-4 mb-6">
		<Switch label="Toggle x-axis" bind:checked={showXAxis} />
		<Switch label="Toggle y-axis" bind:checked={showYAxis} />
	</div>

	<Chart bind:data class="w-full md:w-1/2 h-[200px] md:mr-auto">
		{#if showXAxis}
			<Chart.XAxis dataKey="year" />
		{/if}

		{#if showYAxis}
			<Chart.YAxis dataKey="birthrate" />
		{/if}

		<Chart.Bar dataKey="birthrate" fill="#f97316" />
	</Chart>
</section>
