<script lang="ts">
	import { Chart } from '$lib/components/chart';
	import Switch from '$lib/components/switch/Switch.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';

	let data = [
		{ year: 1990, birthrate: 16.7, otherrate: 5 },
		{ year: 1995, birthrate: 14.6, otherrate: 10.4 },
		{ year: 2000, birthrate: 14.4, otherrate: 8.6 },
		{ year: 2005, birthrate: 14, otherrate: 7 },
		{ year: 2010, birthrate: 13, otherrate: 20 },
		{ year: 2015, birthrate: 12.4, otherrate: 25 }
	];

	let showXAxis = true;
	let showYAxis = true;
	let showLegend = true;
	let showBars = true;
	let showLine = true;
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
		<Switch label="Toggle legend" bind:checked={showLegend} />
		<Switch label="Toggle bars" bind:checked={showBars} />
		<Switch label="Toggle line" bind:checked={showLine} />
	</div>

	<Chart bind:data class="w-full md:w-1/2 h-[200px] md:mr-auto">
		<svelte:fragment slot="top">
			{#if showLegend}
				<Chart.Legend />
			{/if}
		</svelte:fragment>

		<svelte:fragment slot="chart">
			{#if showXAxis}
				<Chart.XAxis dataKey="year" />
			{/if}

			{#if showYAxis}
				<Chart.YAxis />
			{/if}

			{#if showBars}
				<Chart.Bar name="Birth Rate" dataKey="birthrate" fill="#f97316" />
			{/if}

			{#if showLine}
				<Chart.Line name="Other" dataKey="otherrate" />
			{/if}
		</svelte:fragment>
	</Chart>
</section>
