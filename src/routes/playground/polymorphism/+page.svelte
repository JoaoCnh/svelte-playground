<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
</script>

<section id="polymorphism" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="polymorphism"
		description="Exploring polymorphic components in Svelte by building a simple button component."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/button/Button.svelte"
	/>

	<ul class="flex flex-col md:flex-row gap-2">
		<li>
			<Button class="capitalize">primary button</Button>
		</li>
		<li>
			<Button variant="secondary" class="capitalize">secondary button</Button>
		</li>
		<li>
			<Button asChild let:cx>
				<a href="/" class="{cx} capitalize">primary button as anchor</a>
			</Button>
		</li>
		<li>
			<Button asChild variant="secondary" let:cx>
				<a href="/" class="{cx} capitalize">secondary button as anchor</a>
			</Button>
		</li>
	</ul>
</section>
