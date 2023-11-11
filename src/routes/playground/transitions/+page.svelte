<script lang="ts">
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import TodoList from '$lib/components/todo-list/TodoList.svelte';
</script>

<section id="transitions" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="transitions"
		description="Exploring the Svelte built-in transitions creating an animated todo list."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/todo-list/TodoList.svelte"
	/>

	<TodoList />
</section>
