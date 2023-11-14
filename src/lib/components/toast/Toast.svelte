<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import ErrorIcon from '$lib/components/icons/ErrorIcon.svelte';
	import RocketIcon from '$lib/components/icons/RocketIcon.svelte';
	import WarningIcon from '$lib/components/icons/WarningIcon.svelte';
	import CheckCircleIcon from '$lib/components/icons/CheckCircleIcon.svelte';
	import { toast, type Toast } from './store';

	export let timeoutMs = 3000;

	let visible = false;
	let timeout: number = 0;

	export function show(toast: Toast) {
		$toast = toast;
	}

	export function dismiss() {
		$toast = null;
	}

	function getIcon(toast: Toast | null) {
		switch (toast?.type) {
			case 'warning':
				return WarningIcon;
			case 'error':
				return ErrorIcon;
			case 'success':
				return CheckCircleIcon;
			case 'info':
			default:
				return RocketIcon;
		}
	}

	function getTypeClass(toast: Toast | null) {
		switch (toast?.type) {
			case 'warning':
				return 'text-orange-500 bg-orange-100';
			case 'error':
				return 'text-red-500 bg-red-100';
			case 'success':
				return 'text-green-500 bg-green-100';
			case 'info':
			default:
				return 'text-blue-500 bg-blue-100';
		}
	}

	function onMessageChange(toast: Toast | null, ms: number) {
		clearTimeout(timeout);

		if (!toast) {
			visible = false;
		} else {
			visible = true;
			if (ms > 0) {
				timeout = window.setTimeout(() => (visible = false), ms);
			}
		}
	}

	$: icon = getIcon($toast);
	$: typeClass = getTypeClass($toast);
	$: onMessageChange($toast, timeoutMs);

	onDestroy(() => {
		dismiss();
		clearTimeout(timeout);
	});
</script>

{#if visible && $toast}
	<div
		class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow fixed top-5 right-5 z-50"
		role="alert"
		transition:fly={{ x: 200 }}
	>
		<div
			class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg {typeClass}"
		>
			<svelte:component this={icon} class="w-5 h-5" />
			<span class="sr-only">{$toast.type} icon</span>
		</div>

		<div class="ms-3 text-sm font-normal">
			{$toast.text}
		</div>

		<button
			type="button"
			class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
			aria-label="close"
			on:click={dismiss}
		>
			<span class="sr-only">close</span>
			<CloseIcon class="w-4 h-4" />
		</button>
	</div>
{/if}
