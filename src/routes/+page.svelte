<script lang="ts">
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
</script>

<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
	<div class="hidden sm:mb-8 sm:flex sm:justify-center">
		<div
			class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
		>
			<span class="font-semibold text-blue-700">React</span> Playground coming soon.
			<!-- <a href="/" class="font-semibold text-orange-600"
					><span class="absolute inset-0" aria-hidden="true" />Read more
					<span aria-hidden="true">&rarr;</span></a
				> -->
		</div>
	</div>
	<div class="text-center">
		<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Svelte Playground</h1>

		<p class="mt-6 text-lg leading-8 text-gray-600">
			This is the home of all of my experiments with Svelte. Home to simple & complex components,
			the goal is to have a place to store all my experiments in one place instead of creating a new
			project for every single one.
		</p>

		<ul class="flex items-center justify-center my-3">
			<li>
				<a href="https://github.com/JoaoCnh/svelte-playground" target="_blank" class="group">
					<GithubIcon class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600" />
				</a>
			</li>
		</ul>

		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/playground"
				class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
			>
				Explore playground
			</a>
			<a
				href="https://joaocnh.dev"
				class="text-sm font-semibold leading-6 text-gray-900"
				target="_blank"
			>
				Learn more about me <span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
</div>
