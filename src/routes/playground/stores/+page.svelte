<script lang="ts">
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import ImprovedTodoList from '$lib/components/improved-todo-list/ImprovedTodoList.svelte';
</script>

<section id="stores" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="stores"
		description="Exploring Svelte stores with an improved todo list."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/improved-todo-list/ImprovedTodoList.svelte"
	/>

	<div class="flex justify-center">
		<ImprovedTodoList />
	</div>
</section>
