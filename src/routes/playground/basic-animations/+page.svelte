<script lang="ts">
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import AnimatedDoge from '$lib/components/animated-doge/AnimatedDoge.svelte';
</script>

<section id="basic-animations" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="basic animations"
		description="Creating a custom intersection observer action to trigger some basic animations."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/components/animated-doge/AnimatedDoge.svelte"
	/>

	<div class="flex items-center justify-center pb-[100%] md:pb-[50%]">
		<p class="text-lg font-normal text-gray-500 lg:text-xl">Maybe scroll down? 🤔</p>
	</div>

	<div class="w-full mt-32 -mx-12 lg:-mx-16">
		<AnimatedDoge />
	</div>
</section>
