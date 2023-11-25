<script lang="ts">
	import NetflixSlider from '$lib/components/netflix-slider/NetflixSlider.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';

	import shrekImg from '$lib/assets/netflix/shrek.jpeg?enhanced&w=400;640;1280&imagetools';
	import theRoomImg from '$lib/assets/netflix/the-room.jpeg?enhanced&w=400;640;1280&imagetools';
	import beeImg from '$lib/assets/netflix/bee.jpeg?enhanced&w=400;640;1280&imagetools';

	const slides = [
		{ id: String(Date.now() + 1), image: shrekImg, title: 'Shrek' },
		{ id: String(Date.now() + 2), image: theRoomImg, title: 'The Room' },
		{ id: String(Date.now() + 3), image: beeImg, title: 'Bee Movie' }
	];
</script>

<section id="netflix" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="netflix"
		description="Building a Netflix like slider."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/netflix-slider/NetflixSlider.svelte"
	/>

	<NetflixSlider {slides} />
</section>
