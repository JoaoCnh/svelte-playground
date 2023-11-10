<script lang="ts">
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';

	export let title: string;
	export let description: string;
	export let githubUrl: string;
</script>

<div class="mb-16 md:mb-28">
	<h1
		class="mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl uppercase break-words"
	>
		<mark
			class="text-white bg-gradient-to-r from-orange-500 to-red-500 rounded text-transparent bg-clip-text"
		>
			{title}
		</mark>
	</h1>

	<p class="text-lg font-normal text-gray-500 lg:text-xl">
		{description}
	</p>

	<ul class="mt-2 flex gap-6">
		<li>
			<a
				href={githubUrl}
				class="group -m-1 p-1"
				target="_blank"
				aria-label="Check source code on GitHub"
			>
				<GithubIcon class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600" />
			</a>
		</li>
	</ul>
</div>
