<script lang="ts">
	import Form from './Form.svelte';
	import Tabs from './Tabs.svelte';
	import List from './List.svelte';
	import { todos, filter } from './todos-store';
</script>

<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
	<div class="p-4 sm:p-6 overflow-hidden">
		<Form bind:todos={$todos} />

		<Tabs bind:filter={$filter} />

		<List bind:todos={$todos} bind:filter={$filter} />
	</div>
</div>
