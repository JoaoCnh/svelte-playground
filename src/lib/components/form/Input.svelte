<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		id?: string;
		label: string;
		value: any;
		error?: boolean;
	}

	export let id: string = '';
	export let label: string;
	export let value: any;
	export let error = false;
</script>

<div class:error>
	<label for={id} class="block mb-2 text-sm font-medium text-gray-900 capitalize">
		{label}
	</label>

	<div class="relative">
		<input
			{id}
			bind:value
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
			{...$$restProps}
		/>

		{#if $$slots.end}
			<div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
				<slot name="end" />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	@keyframes shake {
		0% {
			margin-left: 0rem;
		}
		25% {
			margin-left: 0.5rem;
		}
		75% {
			margin-left: -0.5rem;
		}
		100% {
			margin-left: 0rem;
		}
	}

	.error label {
		@apply text-red-700;
	}

	.error input {
		animation: shake 0.2s ease-in-out 0s 2;
		@apply border-red-500 text-red-900 placeholder-red-700;
	}

	.error input:focus {
		@apply ring-red-500 border-red-500;
	}
</style>
