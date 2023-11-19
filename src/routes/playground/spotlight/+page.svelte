<script lang="ts">
	import Spotlight from '$lib/components/spotlight/Spotlight.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import Kbd from '$lib/components/kbd/Kbd.svelte';
</script>

<section id="spotlight" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="spotlight"
		description="Exploring advanced components in Svelte by building Apple's Spotlight search assistant."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/spotlight/Spotlight.svelte"
	/>

	<div class="-mt-10 md:-mt-20 mb-4 md:mb-8">
		<h2 class="mb-2 text-lg font-semibold text-gray-900">
			Cool stuff (Explore the code on GitHub):
		</h2>
		<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
			<li>⏱️ Debounces search requests;</li>
			<li>🏁 Supports race conditions;</li>
			<li>📦 Caches requests;</li>
		</ul>
	</div>

	<p class="text-gray-500">
		Please press <Kbd>Ctrl</Kbd> + <Kbd>Space</Kbd> to bring up the spotlight search.
	</p>

	<Spotlight />
</section>
