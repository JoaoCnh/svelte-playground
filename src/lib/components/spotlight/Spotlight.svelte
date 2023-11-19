<script lang="ts">
	import { trapFocus } from '$lib/actions/trap-focus';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import Results from './Results.svelte';
	import QueryForm from './QueryForm.svelte';
	import type { SearchResult } from '$lib/services/search/types';

	let dialog: HTMLDialogElement;
	let visible = false;
	let query: string = '';
	let results: SearchResult = { groups: [] };

	function handleKeydown(event: KeyboardEvent) {
		if (!visible) {
			visible = event.ctrlKey && event.key === ' ';
		}
	}

	function close() {
		query = '';
		visible = false;
		results = { groups: [] };
	}

	$: if (dialog && visible) dialog.showModal();
	$: if (dialog && !visible) dialog.close();
</script>

<svelte:window on:keydown={handleKeydown} />

{#if visible}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<dialog
		bind:this={dialog}
		class="relative w-full max-w-md max-h-full text-white bg-transparent rounded-lg backdrop:bg-black/40 backdrop:backdrop-blur-sm"
		on:close={close}
		on:click|self={close}
	>
		<div
			role="application"
			class="h-full w-full max-w-[450px] flex flex-col overflow-hidden bg-neutral-500 rounded-lg border border-neutral-400 shadow-md"
			use:trapFocus
		>
			<QueryForm on:query={(e) => (query = e.detail)} on:result={(e) => (results = e.detail)} />

			{#if !!query}
				<Results {results} />
			{/if}
		</div>
		<button
			type="button"
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
			on:click={close}
		>
			<CloseIcon class="w-4 h-4" />
		</button>
	</dialog>
{/if}
