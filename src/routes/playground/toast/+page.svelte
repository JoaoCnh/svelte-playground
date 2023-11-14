<script lang="ts">
	import Toast from '$lib/components/toast/Toast.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';

	let toast: Toast;
</script>

<section id="toast" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="toast"
		description="Exploring Svelte stores with a toast component."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/toast/Toast.svelte"
	/>

	<Toast bind:this={toast} />

	<div class="w-full flex flex-col md:flex-row gap-2">
		<Button
			class="!bg-blue-500"
			on:click={() => toast.show({ type: 'info', text: 'this is an info toast' })}
		>
			Show info toast
		</Button>

		<Button
			class="!bg-green-500"
			on:click={() => toast.show({ type: 'success', text: 'this is an success toast' })}
		>
			Show success toast
		</Button>

		<Button
			class="!bg-red-500"
			on:click={() => toast.show({ type: 'error', text: 'this is an error toast' })}
		>
			Show error toast
		</Button>

		<Button
			class="!bg-yellow-500"
			on:click={() => toast.show({ type: 'warning', text: 'this is an warning toast' })}
		>
			Show warning toast
		</Button>
	</div>
</section>
