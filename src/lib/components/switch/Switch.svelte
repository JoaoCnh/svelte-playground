<script lang="ts">
	export let label: string;
	export let containerClass: string = '';
	export let checked = false;
</script>

<label class="relative inline-flex items-center cursor-pointer {containerClass}">
	<input type="checkbox" class="sr-only peer" bind:checked {...$$restProps} />
	<div
		class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-orange-600"
	/>
	<span class="ms-3 text-sm font-medium text-gray-900">{label}</span>
</label>
