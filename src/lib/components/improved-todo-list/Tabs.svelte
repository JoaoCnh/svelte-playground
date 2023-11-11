<script lang="ts">
	import { unslugify } from '$lib/unslugify';
	import type { Filter } from './types';

	export let filter: Filter = 'all';

	const filters: Filter[] = ['all', 'done', 'not-done'];
</script>

<div
	role="tablist"
	aria-orientation="horizontal"
	class="h-10 items-center justify-center rounded-md bg-transparent text-zinc-600 grid w-full grid-cols-3 mb-6"
>
	{#each filters as fltr}
		<button
			type="button"
			role="tab"
			data-state={fltr === filter ? 'active' : 'inactive'}
			tabindex={fltr === filter ? 0 : -1}
			class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 capitalize font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
			on:click={() => (filter = fltr)}
		>
			{unslugify(fltr)}
		</button>
	{/each}
</div>
