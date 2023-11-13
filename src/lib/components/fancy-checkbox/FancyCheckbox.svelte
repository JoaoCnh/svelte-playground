<script lang="ts">
	import XCircleIcon from '$lib/components/icons/XCircleIcon.svelte';
	import CheckCircleIcon from '$lib/components/icons/CheckCircleIcon.svelte';

	export let containerClass = '';
	export let checked = false;
	export let hovering = false;

	let { class: className, ...otherProps } = $$restProps;
</script>

<div
	class="relative w-6 h-6 {containerClass}"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	role="checkbox"
	tabindex="0"
	aria-checked={checked}
>
	<input
		type="checkbox"
		class="w-full h-full opacity-0 cursor-pointer {className}"
		bind:checked
		{...otherProps}
	/>

	{#if checked && hovering}
		<XCircleIcon
			class="absolute inset-0 w-6 h-6 pointer-events-none text-red-500"
			aria-hidden="true"
		/>
	{:else}
		<CheckCircleIcon
			class="absolute inset-0 w-6 h-6 pointer-events-none {checked
				? 'text-green-500'
				: 'text-gray-500'}"
			aria-hidden="true"
		/>
	{/if}
</div>
