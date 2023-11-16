<script lang="ts">
	import { componentRegistry } from './component-registry';
	import type { Data } from './types';

	export let data: Data;
</script>

{#each data.components as component}
	{@const comp = componentRegistry[component.type]}

	{#await comp.getAsync()}
		{#if comp.loader}
			<svelte:component this={comp.loader} {...component} />
		{/if}
	{:then module}
		<svelte:component this={module.default} {...component} />
	{/await}
{/each}
