<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert } from '$lib/components/alert';
	import Button from '$lib/components/button/Button.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import RocketIcon from '$lib/components/icons/RocketIcon.svelte';
	import WarningIcon from '$lib/components/icons/WarningIcon.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import UserCircleIcon from '$lib/components/icons/UserCircleIcon.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let showCreateForm = false;
</script>

<section id="actions" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="actions"
		description="Trying Svelte.Kit server actions and loaders by building a login form."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/playground/actions/+page.svelte"
	/>

	<div class="w-full md:w-1/2 mx-auto">
		{#if form?.id === 'login' && form?.success}
			<Alert variant="success">
				<UserCircleIcon slot="icon" class="flex-shrink-0 w-4 h-4 mr-2" />
				<Alert.Title slot="title">a wizard is never late, nor is he early</Alert.Title>
				<Alert.Body slot="body" class="capitalize">
					{data.user?.name} arrives precisely when he means to.
				</Alert.Body>
			</Alert>
		{/if}

		{#if form?.id === 'create' && form?.success}
			<Alert variant="success">
				<RocketIcon slot="icon" class="flex-shrink-0 w-4 h-4 mr-2" />
				<Alert.Title slot="title">success</Alert.Title>
				<Alert.Body slot="body" class="capitalize">spell created successfully</Alert.Body>
			</Alert>
		{/if}

		{#if form?.error}
			<Alert variant="danger">
				<WarningIcon slot="icon" class="flex-shrink-0 w-4 h-4 mr-2" />
				<Alert.Title slot="title">i have no memory of this place</Alert.Title>
				<Alert.Body slot="body" class="capitalize">{form.error}</Alert.Body>
			</Alert>
		{/if}

		{#if data.user}
			<Dialog bind:open={showCreateForm} title="create new spell">
				<form
					method="POST"
					action="?/create"
					class="p-4 md:p-5"
					use:enhance={() => {
						return ({ update }) => {
							showCreateForm = false;
							update();
						};
					}}
				>
					<div class="grid gap-4 mb-4 grid-cols-2">
						<div class="col-span-2">
							<label for="spell" class="block mb-2 text-sm font-medium text-gray-900 capitalize">
								spell
							</label>
							<input
								type="text"
								id="spell"
								name="spell"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								placeholder="Type the spell's name"
								required
							/>
						</div>
					</div>

					<button
						type="submit"
						class="text-white inline-flex items-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center capitalize"
					>
						<PlusIcon class="w-4 h-4 mr-2" />
						add spell
					</button>
				</form>
			</Dialog>

			<div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
				<div class="flex items-center justify-between mb-4">
					<h5 class="text-xl font-bold leading-none text-gray-900">Spells</h5>
				</div>

				<ul role="list" class="divide-y divide-gray-200 mb-4">
					{#if data.spells.length === 0}
						<Alert variant="info">
							<Alert.Title slot="title">seems a bit empty</Alert.Title>
							<Alert.Body slot="body" class="capitalize">
								there are currently no spells. Why not create one?
							</Alert.Body>
						</Alert>
					{/if}

					{#each data.spells as spell}
						<li class="py-3 sm:py-4">
							{spell}
						</li>
					{/each}
				</ul>

				<div class="flex flex-col md:flex-row justify-between">
					<form method="POST" action="?/logout" use:enhance>
						<button
							type="submit"
							class="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center capitalize"
						>
							logout
						</button>
					</form>

					<Button class="capitalize" on:click={() => (showCreateForm = true)}>create</Button>
				</div>
			</div>
		{:else}
			<div
				class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 {form?.id ===
					'login' && form?.error
					? 'form-failure'
					: ''}"
			>
				<form method="POST" class="space-y-6" action="?/login" use:enhance>
					<h5 class="text-xl font-medium text-gray-900 capitalize">sign in</h5>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 capitalize">
							e-mail
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={form?.email ?? ''}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
							placeholder="try gandalf@middle-earth.com"
							required
							autocomplete="off"
						/>
					</div>

					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-gray-900 capitalize">
							password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={form?.password ?? ''}
							placeholder="Speak friend and enter"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
							required
							autocomplete="off"
						/>
					</div>

					<button
						type="submit"
						class="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>
						Login to your account
					</button>
				</form>
			</div>
		{/if}
	</div>
</section>

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

	.form-failure label {
		@apply text-red-700;
	}

	.form-failure input {
		@apply border-red-500 text-red-900 placeholder-red-700;
	}

	.form-failure input:focus {
		@apply ring-red-500 border-red-500;
	}

	.form-failure div,
	.form-failure button {
		animation: shake 0.2s ease-in-out 0s 2;
	}
</style>
