<script lang="ts">
	export let { class: className = '' } = $$restProps;
</script>

<div class="mt-2 mb-4 text-s {className}">
	<slot />
</div>
