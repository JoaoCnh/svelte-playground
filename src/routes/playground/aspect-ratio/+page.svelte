<script>
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
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
		<li class="w-full h-full">
			<AspectRatio ratio={3 / 4}>
				<img src="/aspect-ratio.jpg" alt="3/4 ratio" class="w-full h-full object-cover" />
			</AspectRatio>
		</li>
		<li class="w-full h-full">
			<AspectRatio ratio={16 / 9}>
				<img src="/aspect-ratio.jpg" alt="16/9 ratio" class="w-full h-full object-cover" />
			</AspectRatio>
		</li>
		<li class="w-full h-full">
			<AspectRatio ratio={1}>
				<img src="/aspect-ratio.jpg" alt="1/1 ratio" class="w-full h-full object-cover" />
			</AspectRatio>
		</li>
	</ul>
</section>
