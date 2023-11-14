<script lang="ts">
	let className = '';
	export { className as class };
</script>

<button
	type="submit"
	class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center capitalize {className}"
>
	<slot />
</button>
