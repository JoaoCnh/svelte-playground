<script lang="ts">
	import type { Variant } from './types';

	export let variant: Variant | undefined = undefined;

	const variantStyles: Record<Variant | 'none', string> = {
		none: 'text-gray-800 border-gray-300 bg-gray-50',
		info: 'text-blue-800 border-blue-300 bg-blue-50',
		success: 'text-green-800 border-green-300 bg-green-50',
		warning: 'text-yellow-800 border-yellow-300 bg-yellow-50',
		danger: 'text-red-800 border-red-300 bg-red-50'
	};

	$: variantClass = variantStyles[variant || 'none'];
</script>

<div class="p-4 mb-4 border rounded-lg {variantClass}" role="alert">
	<div class="flex items-center">
		{#if $$slots.icon}
			<slot name="icon" />
		{/if}

		{#if $$slots.title}
			<slot name="title" />
		{/if}
	</div>

	{#if $$slots.body}
		<slot name="body" />
	{/if}

	<div class="flex">
		<slot />
	</div>
</div>
