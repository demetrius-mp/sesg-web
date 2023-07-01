<script lang="ts">
	import { tableSizeStore } from '$lib/stores/tableSizeStore';

	type T = $$Generic;

	export let rows: T[];
</script>

<div class="overflow-x-auto">
	<table class="table {$tableSizeStore}">
		<thead>
			<tr>
				<slot name="head" />
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<slot name="row" {row} />
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<slot name="head" />
		</tfoot>
	</table>
</div>
