<script lang="ts">
	import ResultOption from './ResultOption.svelte';
	import type { SearchResult } from '$lib/services/search/types';

	export let results: SearchResult = { groups: [] };

	let selectedGroupIdx = 0;
	let selectedItemIdx = 0;

	$: renderedGroups = results.groups.filter((group) => group.items.length > 0);

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp': {
				if (selectedItemIdx > 0) {
					selectedItemIdx = selectedItemIdx - 1;
				} else if (selectedGroupIdx > 0) {
					const items = renderedGroups.at(selectedGroupIdx - 1)?.items || [];
					selectedGroupIdx = selectedGroupIdx - 1;
					selectedItemIdx = items.length - 1;
				}
				break;
			}
			case 'ArrowDown': {
				const items = renderedGroups.at(selectedGroupIdx)?.items || [];
				if (selectedItemIdx < items.length - 1) {
					selectedItemIdx = selectedItemIdx + 1;
				} else if (selectedGroupIdx < renderedGroups.length - 1) {
					selectedGroupIdx = selectedGroupIdx + 1;
					selectedItemIdx = 0;
				}
				break;
			}
			default:
				break;
		}
	}

	$: resultCount = results.groups.reduce((acc, curr) => acc + curr.items.length, 0);
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	role="listbox"
	aria-label="search results"
	class="max-h-[300px] overflow-y-auto overflow-x-hidden"
>
	{#if resultCount === 0}
		<div role="presentation" class="py-6 text-center text-sm">No results found.</div>
	{:else}
		{#each results.groups as group, groupIdx}
			{@const showItems = group.items.length > 0}
			{@const showSeparator = groupIdx < results.groups.length - 1}

			{#if showItems}
				<div class="overflow-hidden p-1 text-foreground">
					<div aria-hidden="true" class="px-2 py-1.5 text-xs font-medium text-gray-300 capitalize">
						{group.title}
					</div>
					<ul role="group">
						{#each group.items as item, itemIdx}
							{@const selected = selectedGroupIdx === groupIdx && selectedItemIdx === itemIdx}

							<ResultOption {selected} url={item.url} label={item.label} icon={item.icon} />
						{/each}
					</ul>
				</div>

				{#if showSeparator}
					<div class="-mx-1 h-px bg-neutral-400" />
				{/if}
			{/if}
		{/each}
	{/if}
</div>
