<script lang="ts">
	import LitIcon from '$lib/components/icons/LitIcon.svelte';
	import OpenIcon from '$lib/components/icons/OpenIcon.svelte';
	import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
	import VercelIcon from '$lib/components/icons/VercelIcon.svelte';
	import SvelteIcon from '$lib/components/icons/SvelteIcon.svelte';

	export let selected = false;
	export let url: string;
	export let label: string;
	export let icon: string | null;

	let element: HTMLAnchorElement;

	function renderIcon(icon: string | null) {
		switch (icon) {
			case 'apple':
				return AppleIcon;
			case 'vercel':
				return VercelIcon;
			case 'svelte':
				return SvelteIcon;
			case 'lit':
				return LitIcon;
			default:
				return OpenIcon;
		}
	}

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
		<svelte:component this={renderIcon(icon)} class="mr-2 h-4 w-4" />
		<span>{label}</span>
	</a>
</li>
