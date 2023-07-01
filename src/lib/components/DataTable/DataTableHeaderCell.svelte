<script lang="ts">
	import IconChevronDown from '~icons/mdi/ChevronDown';
	import IconChevronUp from '~icons/mdi/ChevronUp';

	type T = $$Generic<Record<string, 'asc' | 'desc'>>;

	export let orderState: T;
	export let field: keyof T;

	$: currentOrder = orderState[field];

	function orderByField() {
		if (currentOrder === undefined) {
			// @ts-ignore
			orderState[field] = 'asc';
			return;
		}

		if (currentOrder === 'asc') {
			// @ts-ignore
			orderState[field] = 'desc';
			return;
		}

		delete orderState[field];
		orderState = orderState;
	}
</script>

<th on:click={orderByField}>
	<button class="flex">
		<slot />
		{#if currentOrder === 'asc'}
			<IconChevronUp class="w-4 h-4" />
		{:else if currentOrder === 'desc'}
			<IconChevronDown class="w-4 h-4" />
		{/if}
	</button>
</th>
