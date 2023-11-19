<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { query } from '$lib/query';
	import { debounce } from '$lib/debounce';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import type { SearchResult } from '$lib/services/search/types';

	const dispatch = createEventDispatcher();

	let debouncedValue = '';
	const searchQuery = query<SearchResult>('/playground/spotlight');
	let lastAbortController: AbortController;

	const debouncedSubmit = debounce(500, async () => {
		const trimmedQuery = debouncedValue.trim();

		if (trimmedQuery.length === 0) {
			dispatch('query', '');
		} else if (trimmedQuery.length > 3) {
			lastAbortController?.abort();
			lastAbortController = new AbortController();
			const signal = lastAbortController.signal;

			const params = new URLSearchParams();
			params.append('q', trimmedQuery);

			try {
				const results = await searchQuery.fetch('search', params, { signal });
				dispatch('result', results);
				dispatch('query', trimmedQuery);
			} catch (error) {
				if ((error as Error).name === 'AbortError') {
					console.log('Previous request was aborted.');
				} else {
					console.error(error);
				}
			}
		}
	});
</script>

<div class="flex items-center border-b border-neutral-400 px-2">
	<SearchIcon class="mr-2 h-4 w-4 shrink-0 opacity-50 " />
	<input
		type="text"
		id="q"
		name="q"
		class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-white disabled:cursor-not-allowed disabled:opacity-50"
		autocomplete="off"
		autocorrect="off"
		placeholder="Spotlight Search"
		bind:value={debouncedValue}
		on:input={debouncedSubmit}
	/>
</div>
