<script lang="ts">
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';
	import type { ImageProps } from './types';

	interface $$Props extends ImageProps {}

	export let src: string;
	export let ratio: number | 'vh';
</script>

<AspectRatio {ratio}>
	<img {src} alt="test" class="w-full h-full object-cover" />
</AspectRatio>
