<script lang="ts">
	import type { Todo } from './types';

	let todo = '';
	let todoInput: HTMLInputElement;

	export let todos: Todo[];

	function handleSubmit() {
		todos = [...todos, { id: Date.now(), title: todo, done: false }];
		todo = '';
		todoInput.focus();
	}
</script>

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
