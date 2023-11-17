<script lang="ts">
	import type { ComponentRegister } from './component-registry';
	import type { Component } from './types';

	export let register: ComponentRegister;
	export let data: Component;
</script>

{#await register.getAsync()}
	{#if register.loader}
		<svelte:component this={register.loader} {...data} />
	{/if}
{:then module}
	<svelte:component this={module.default} {...data} />
{/await}
