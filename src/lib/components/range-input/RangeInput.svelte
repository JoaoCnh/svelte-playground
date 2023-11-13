<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		label: string;
	}

	export let label: string = '';
	export let value: any = undefined;
	let { id, class: className = '', ...otherProps } = $$restProps;
</script>

{#if label}
	<label for={id} class="block mb-2 text-sm font-medium text-gray-900 capitalize">
		{label}
	</label>
{/if}

<input
	{id}
	type="range"
	class="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm {className}"
	bind:value
	{...otherProps}
/>
