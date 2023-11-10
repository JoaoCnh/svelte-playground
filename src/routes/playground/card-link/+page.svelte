<script>
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';
	import CardLink from '$lib/components/card-link/CardLink.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';

	let data = Array.from({ length: 10 }, (_, i) => {
		let number = i + 1;
		let prefix = number < 10 ? 0 : '';
		return `${prefix}${number}`;
	});
</script>

<section id="card link" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="card link"
		description="Exploring animations in Svelte with a card component."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/card-link/CardLink.svelte"
	/>

	<ul
		class="mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14"
	>
		{#each data as item}
			<li class="w-full h-full">
				<AspectRatio ratio={1}>
					<CardLink title={item} href="/playground/card-link" image="/card-link.jpg" />
				</AspectRatio>
			</li>
		{/each}
	</ul>
</section>
