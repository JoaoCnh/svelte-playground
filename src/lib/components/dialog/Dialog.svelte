<script lang="ts">
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';

	export let open = false;
	export let title: string;

	let dialog: HTMLDialogElement;

	export function openModal() {
		dialog.showModal();
	}

	export function closeModal() {
		dialog.close();
	}

	$: if (dialog && open) dialog.showModal();
	$: if (dialog && !open) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	class="relative w-full max-w-md max-h-full bg-white rounded-lg backdrop:bg-black/30"
	on:close={() => (open = false)}
	on:click|self={closeModal}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
			<h3 class="text-lg font-semibold text-gray-900 capitalize">
				{title}
			</h3>
			<button
				type="button"
				class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
				on:click={closeModal}
			>
				<CloseIcon class="w-6 h-6" aria-hidden="true" />
				<span class="sr-only">Close modal</span>
			</button>
		</div>

		<slot />
	</div>
</dialog>
