<script>
	import Header from '$lib/components/header/Header.svelte';
	import '../app.css';
</script>

<div class="bg-white">
	<Header />

	<main>
		<slot />
	</main>
</div>
