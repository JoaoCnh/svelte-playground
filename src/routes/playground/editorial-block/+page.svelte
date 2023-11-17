<script lang="ts">
	import AwaitedBlock from '$lib/components/editorial-block/AwaitedBlock.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import EditorialBlock from '$lib/components/editorial-block/EditorialBlock.svelte';
	import { componentRegistry } from '$lib/components/editorial-block/component-registry';
	import type { Data } from '$lib/components/editorial-block/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const staticData: Data = {
		components: [
			{
				type: 'image',
				src: 'https://picsum.photos/seed/picsum/1000/600',
				ratio: 'vh'
			},
			{
				type: 'another-one',
				djKhaled: true
			}
		]
	};
</script>

<section id="editorial-block" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="editorial block"
		description="Exploring dynamic imports in Svelte by building an EditorialBlock component."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/editorial-block/EditorialBlock.svelte"
	/>

	{#each data.components as componentPromise}
		{#await componentPromise}
			Streaming component data...
		{:then componentData}
			{@const comp = componentRegistry[componentData.type]}

			<AwaitedBlock register={comp} data={componentData} />
		{:catch error}
			{error.message}
		{/await}
	{/each}

	<EditorialBlock data={staticData} />
</section>
