<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let selected = false;
	export let url: string;
	export let label: string;
	export let icon: ComponentType | null = null;

	let element: HTMLAnchorElement;

	$: if (selected && element) {
		element.focus();
	}
</script>

<li
	role="option"
	class="relative select-none rounded-sm px-2 py-1.5 text-md outline-none hover:bg-orange-500/60 aria-selected:bg-orange-500/60 aria-selected:text-white capitalize"
	aria-selected={selected}
>
	<a bind:this={element} href={url} class="flex items-center w-full">
		{#if icon}
			<svelte:component this={icon} class="mr-2 h-4 w-4" />
		{/if}

		<span>{label}</span>
	</a>
</li>
