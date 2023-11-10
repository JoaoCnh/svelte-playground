<script lang="ts">
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import ImageSequence from '$lib/components/image-sequence/ImageSequence.svelte';
	import AnimatedDoge from '$lib/components/animated-doge/AnimatedDoge.svelte';

	let airpodsMax = Array.from({ length: 45 }, (_, i) => i).map((i) => {
		const paddedIndex = i.toString().padStart(4, '0');
		return `https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-fe72f9b3bfb5/anim/turn/large_2x/large_2x_${paddedIndex}.jpg`;
	});
</script>

<section id="apple-sequence" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="apple sequence"
		description="Trying to replicate a scroll animation usually present in Apple websites."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/image-sequence/ImageSequence.svelte"
	/>

	<ImageSequence images={airpodsMax} duration={200} threshold={100} />

	<div class="w-full mt-32 -mx-12 lg:-mx-16">
		<AnimatedDoge />
	</div>
</section>
