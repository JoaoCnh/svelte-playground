<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import SvelteIcon from '$lib/components/icons/SvelteIcon.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import type { Variant } from '$lib/components/alert';

	let data: (Variant | undefined)[] = ['info', 'success', 'warning', 'danger', undefined];

	function renderVariant(variant: Variant | undefined) {
		return variant || 'regular';
	}
</script>

<section id="slots" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="slots"
		description="Exploring the slots API in Svelte by building a simple alert component."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/alert/index.ts"
	/>

	{#each data as item}
		<Alert variant={item}>
			<SvelteIcon slot="icon" class="flex-shrink-0 w-4 h-4 mr-2" />
			<Alert.Title slot="title">{renderVariant(item)} title</Alert.Title>
			<Alert.Body slot="body">{renderVariant(item)} body</Alert.Body>

			This is the {renderVariant(item)} contents
		</Alert>
	{/each}
</section>
