<script lang="ts">
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';
	import type { ImageProps } from './types';

	interface $$Props extends ImageProps {}

	export let ratio: number | 'vh';
</script>

<AspectRatio {ratio}>
	<div class="w-full h-full" />
</AspectRatio>
