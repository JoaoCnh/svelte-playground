<script lang="ts">
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import EditorialBlock from '$lib/components/editorial-block/EditorialBlock.svelte';
	import type { Data } from '$lib/components/editorial-block/types';

	const data: Data = {
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

	<EditorialBlock {data} />
</section>
