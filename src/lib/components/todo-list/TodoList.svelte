<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import XCircleIcon from '$lib/components/icons/XCircleIcon.svelte';
	import FancyCheckbox from '$lib/components/fancy-checkbox/FancyCheckbox.svelte';

	type Todo = { id: number; title: string; done: boolean };

	let todo = '';
	let todoInput: HTMLInputElement;
	let todos: Todo[] = [];

	function handleSubmit() {
		todos = [...todos, { id: Date.now(), title: todo, done: false }];
		todo = '';
		todoInput.focus();
	}

	function removeTodo(id: number) {
		todos = todos.filter((todo) => todo.id !== id);
	}
</script>

<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
	<div class="p-4 sm:p-6 overflow-hidden">
		<form class="space-y-4 md:space-y-6" on:submit|preventDefault={handleSubmit}>
			<div class="relative z-0 w-full mb-6 group">
				<div class="relative">
					<input
						bind:this={todoInput}
						type="text"
						id="todo"
						name="todo"
						class="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
						placeholder=" "
						required
						bind:value={todo}
					/>
					<label
						for="todo"
						class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Todo
					</label>
					<button
						type="submit"
						class="absolute end-0 bottom-2.5 text-white bg-gradient-to-r from-orange-500 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 rounded-lg px-5 py-2.5 text-center"
					>
						Submit
					</button>
				</div>
				<p class="mt-2 text-gray-500">Describe what you have to do.</p>
			</div>
		</form>

		<h2 class="mb-2 text-lg font-semibold text-gray-900 uppercase">todos:</h2>
		<ul class="max-w-md space-y-4 text-gray-500 list-inside">
			{#each todos as todo (todo.id)}
				<li in:fly={{ y: 200, duration: 500 }} out:fade={{ duration: 350 }}>
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
	</div>
</div>
