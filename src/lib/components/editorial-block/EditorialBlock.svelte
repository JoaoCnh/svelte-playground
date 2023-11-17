<script lang="ts">
	import AwaitedBlock from './AwaitedBlock.svelte';
	import { componentRegistry } from './component-registry';
	import type { Data } from './types';

	export let data: Data;
</script>

{#each data.components as component}
	{@const comp = componentRegistry[component.type]}

	<AwaitedBlock register={comp} data={component} />
{/each}
