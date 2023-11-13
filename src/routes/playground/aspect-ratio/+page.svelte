<script>
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';

	let ratios = [
		{ text: '3/4', value: 3 / 4 },
		{ text: '16/9', value: 16 / 9 },
		{ text: '1', value: 1 }
	];

	import aspectRatioImg from '$lib/assets/aspect-ratio.jpg?enhanced&w=400;640;1280&imagetools';
</script>

<section id="Aspect Ratio" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="aspect ratio"
		description="Displays content within the desired ratio."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/aspect-ratio/AspectRatio.svelte"
	/>

	<ul
		class="mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14"
	>
		{#each ratios as ratio}
			<li class="w-full h-full">
				<AspectRatio ratio={ratio.value}>
					<figure class="w-full h-full">
						<enhanced:img
							src={aspectRatioImg}
							alt="{ratio.text} ratio"
							class="w-full h-full object-cover"
							sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
						/>
						<figcaption class="mt-2 text-sm text-center text-gray-500">
							{ratio.text}
						</figcaption>
					</figure>
				</AspectRatio>
			</li>
		{/each}
	</ul>
</section>
