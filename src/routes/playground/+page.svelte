<script lang="ts">
	import type { PageData } from './$types';
	import CardLink from '$lib/components/card-link/CardLink.svelte';
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';

	export let data: PageData;
</script>

<section id="Experiments" class="relative isolate px-6 pt-28 lg:px-8">
	<ul
		class="mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14"
	>
		{#each data.experiments as experiment (experiment.url)}
			<li class="w-full h-full">
				<AspectRatio ratio={1}>
					<CardLink href={experiment.url} title={experiment.label} image="/{experiment.name}.jpg" />
				</AspectRatio>
			</li>
		{/each}
	</ul>
</section>
