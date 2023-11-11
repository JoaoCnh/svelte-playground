<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import { Alert } from '$lib/components/alert';
	import XCircleIcon from '$lib/components/icons/XCircleIcon.svelte';
	import FancyCheckbox from '$lib/components/fancy-checkbox/FancyCheckbox.svelte';
	import type { Todo, Filter } from './types';

	export let todos: Todo[];
	export let filter: Filter;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function createFilterFn(filter: Filter) {
		return (todo: Todo) => {
			switch (filter) {
				case 'done':
					return todo.done;
				case 'not-done':
					return !todo.done;
				case 'all':
				default:
					return true;
			}
		};
	}

	function removeTodo(id: number) {
		todos = todos.filter((todo) => todo.id !== id);
	}

	$: filteredTodos = todos.filter(createFilterFn(filter));
</script>

{#if mounted}
	{#if filteredTodos.length === 0}
		<Alert variant="info">
			<Alert.Title slot="title">Just FYI</Alert.Title>
			<Alert.Body slot="body">There are no todos here...</Alert.Body>
		</Alert>
	{:else}
		<ul class="mt-4 max-w-md space-y-4 text-gray-500 list-inside">
			{#each filteredTodos as todo, idx (todo.id)}
				<li
					animate:flip={{ duration: 500 }}
					in:fly={{ x: -200, duration: 500 }}
					out:fade={{ duration: 100 }}
				>
					<div class="flex items-center space-x-4 h-8">
						<div class="flex-shrink-0">
							<FancyCheckbox bind:checked={todo.done} />
						</div>

						<div class="flex-1 min-w-0">
							<p class="font-medium text-gray-900 truncate">
								{todo.title}
							</p>
						</div>

						{#if todo.done}
							<div
								class="inline-flex items-center text-base font-semibold text-gray-900"
								transition:fade={{ duration: 350 }}
							>
								<button
									class="bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-full font-medium p-1.5 text-center inline-flex items-center"
									on:click={() => removeTodo(todo.id)}
								>
									<XCircleIcon class="w-4 h-4 text-white" />
								</button>
							</div>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
{/if}
