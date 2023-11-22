<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert } from '$lib/components/alert';
	import Input from '$lib/components/form/Input.svelte';
	import Toast from '$lib/components/toast/Toast.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import EyeOfSauron from '$lib/components/icons/EyeOfSauron.svelte';
	import SubmitButton from '$lib/components/form/SubmitButton.svelte';
	import PageHeader from '$lib/components/page-header/PageHeader.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let showCreateForm = false;
	let toast: Toast;

	$: {
		// we could also do this declaratively on use:enhance but (inserts this is my garbage possum meme)
		if (form?.error) {
			toast.show({ type: 'error', text: form.error });
		}

		if (form?.id === 'login' && form?.success) {
			toast.show({
				type: 'success',
				text: `${data.user?.name} arrives precisely when he means to.`
			});
		}

		if (form?.id === 'create' && form?.success) {
			toast.show({
				type: 'success',
				text: 'spell created successfully'
			});
		}
	}
</script>

<section id="actions" class="relative isolate px-6 pt-28 lg:px-8">
	<PageHeader
		title="actions"
		description="Trying Svelte.Kit server actions and loaders by building a login form."
		githubUrl="https://github.com/JoaoCnh/svelte-playground/blob/main/src/lib/playground/actions/+page.svelte"
	/>

	<Toast bind:this={toast} />

	<div class="w-full md:max-w-md mx-auto">
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
							<Input
								type="text"
								id="spell"
								name="spell"
								label="spell"
								value={form?.spell ?? ''}
								placeholder="Type the spell's name"
								required
							/>
						</div>
					</div>

					<SubmitButton class="inline-flex items-center">
						<PlusIcon class="w-4 h-4 mr-2" />
						add spell
					</SubmitButton>
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
						<SubmitButton>logout</SubmitButton>
					</form>

					<Button class="capitalize" on:click={() => (showCreateForm = true)}>create</Button>
				</div>
			</div>
		{:else}
			<div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
				<form method="POST" class="space-y-6" action="?/login" use:enhance>
					<h5 class="text-xl font-medium text-gray-900 capitalize">sign in</h5>

					<Input
						type="email"
						id="email"
						name="email"
						label="e-mail"
						value={form?.email ?? ''}
						placeholder="Try gandalf@middle-earth.com"
						required
						autocomplete="off"
						error={form?.id === 'login' && !!form?.error}
					/>

					<Input
						type="password"
						id="password"
						name="password"
						label="password"
						value={form?.password ?? ''}
						placeholder="Speak friend and enter"
						required
						autocomplete="off"
						error={form?.id === 'login' && !!form?.error}
					>
						<EyeOfSauron slot="end" class="w-6 h-6" />
					</Input>

					<SubmitButton class="w-full">login to your account</SubmitButton>
				</form>
			</div>
		{/if}
	</div>
</section>
