<script lang="ts">
	import { page } from '$app/stores';
	import Default from '$lib/components/errors/Default.svelte';
	import NotFound from '$lib/components/errors/NotFound.svelte';

	function getTitle(status: number) {
		switch (status) {
			case 404:
				return 'page not found';
			default:
				return 'yikes';
		}
	}

	function getMessage(status: number) {
		switch (status) {
			case 404:
				return "the page you're looking for is in another castle";
			default:
				return 'something went wrong';
		}
	}

	function getComponent(status: number) {
		switch (status) {
			case 404:
				return NotFound;
			default:
				return Default;
		}
	}

	$: statusCode = $page.status;
	$: title = getTitle(statusCode);
	$: message = getMessage(statusCode);
	$: errorComponent = getComponent(statusCode);
</script>

<svelte:component this={errorComponent} />

<section
	class="fixed inset-0 grid min-h-full place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8 z-50"
>
	<div class="text-center">
		<p class="text-base font-semibold text-orange-600 drop-shadow-lg">{statusCode}</p>
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl capitalize">
			{title}
		</h1>
		<p class="mt-6 text-base leading-7 text-white capitalize">
			{message}
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
			>
				Go back home
			</a>
			<a
				href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				class="text-sm font-semibold text-white"
			>
				Contact support <span aria-hidden="true">&rarr;</span>
			</a>
		</div>
	</div>
</section>
