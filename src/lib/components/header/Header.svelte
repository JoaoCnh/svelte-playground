<script>
	import SvelteIcon from '$lib/components/icons/SvelteIcon.svelte';
</script>

<header class="absolute inset-x-0 top-0">
	<nav class="flex items-center justify-center p-6 lg:px-8" aria-label="navigation">
		<div class="flex">
			<a href="/" class="-m-1.5 p-1.5 z-40" aria-label="homepage">
				<span class="sr-only">Svelte Playground</span>
				<SvelteIcon class="h-8 w-auto text-orange-600" />
			</a>
		</div>
	</nav>
</header>
