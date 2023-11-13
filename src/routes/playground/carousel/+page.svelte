<script lang="ts">
	import { RangeInput } from '$lib/components/range-input';
	import Button from '$lib/components/button/Button.svelte';
	import Carousel from '$lib/components/carousel/Carousel.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';

	import carouselImg from '$lib/assets/carousel.jpg?enhanced&w=400;640;1280&imagetools';
	import polymorphismImg from '$lib/assets/polymorphism.jpg?enhanced&w=400;640;1280&imagetools';

	let carousel: Carousel;
	let itemsPerPage = 2;
	let autoscrollSpeedPx = 30;
	let items = [
		{ src: carouselImg, title: 'first item' },
		{ src: polymorphismImg, title: 'second item' },
		{ src: carouselImg, title: 'third item' },
		{ src: polymorphismImg, title: 'fourth item' },
		{ src: carouselImg, title: 'fifth item' },
		{ src: polymorphismImg, title: 'sixth item' },
		{ src: carouselImg, title: 'seventh item' },
		{ src: polymorphismImg, title: 'eighth item' }
	];
</script>

<section id="carousel" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="carousel"
		description="Creating a carousel with an imperative handle."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/carousel/Carousel.svelte"
	/>

	<div class="flex flex-col gap-1 mb-6">
		<RangeInput min={1} max={4} label="items per page" bind:value={itemsPerPage} />
		<RangeInput min={30} max={100} label="autoscroll speed" bind:value={autoscrollSpeedPx} />
		<div class="flex justify-between gap-2 flex-wrap">
			<Button on:click={() => carousel.stopAutoscroll()}>Stop</Button>
			<Button on:click={() => carousel.resumeAutoscroll()}>Start</Button>
			<Button on:click={() => carousel.scrollToPrevious()}>Go to previous</Button>
			<Button on:click={() => carousel.scrollToNext()}>Go to next</Button>
		</div>
	</div>

	<Carousel bind:this={carousel} bind:items bind:itemsPerPage bind:autoscrollSpeedPx autoscroll />
</section>
