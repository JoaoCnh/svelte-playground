<script lang="ts">
	type Variant = 'primary' | 'secondary';

	export let variant: Variant = 'primary';
	export let asChild: boolean | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };

	const variantStyles = {
		primary:
			'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5',
		secondary:
			'py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'
	} satisfies Record<Variant, string>;

	type $$Slots = {
		default: undefined extends { asChild: boolean | undefined }
			? Record<string, never>
			: { cx?: string };
	};

	$: cssClass = `${variantStyles[variant]} ${className}`;
</script>

{#if asChild}
	<slot {...$$restProps} cx="inline-flex justify-center {cssClass}" />
{:else}
	<button {...$$restProps} class="inline-flex justify-center {cssClass}" on:click>
		<slot />
	</button>
{/if}
