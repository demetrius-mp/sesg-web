<script lang="ts">
	import { queryParameters, ssp } from 'sveltekit-search-params';
	import type { PageData } from './$types';
	import type { ObjectKeys } from '$lib/types/ObjectKeys';
	import IconDatabaseSearch from '~icons/mdi/DatabaseSearch';

	import DataTable from '$lib/components/DataTable/DataTable.svelte';
	import DataTableHeaderCell from '$lib/components/DataTable/DataTableHeaderCell.svelte';
	import { browser } from '$app/environment';
	import Pagination from '$lib/components/Pagination.svelte';
	import { tableSizeStore } from '$lib/stores/tableSizeStore';

	export let data: PageData;

	type Item = (typeof data.items)[number];
	type Keys = ObjectKeys<Item>;

	let params = queryParameters({
		page: ssp.number(1),
		orderBy: ssp.string('id asc'),
		where: ssp.string('')
	});

	let where = '';

	let orderState: Partial<Record<Keys, 'asc' | 'desc'>> = {
		id: 'asc'
	};

	$: {
		if (browser && $params) {
			$params.orderBy = Object.entries(orderState)
				.map(([k, v]) => `${k} ${v}`)
				.join(',');
		}
	}
</script>

<svelte:head>
	<title>LDA</title>
</svelte:head>

<div class="form-control w-full">
	<label class="label" for="">
		<span class="label-text">Table size</span>
	</label>
	<select bind:value={$tableSizeStore} class="select border-gray-700 w-full">
		<option value="table-xs">Compact</option>
		<option value="table-sm">Small</option>
		<option value="table-md">Regular</option>
		<option value="table-lg">Large</option>
	</select>
</div>

<div class="my-4">
	<label class="label" for="">
		<span class="label-text">Where clause</span>
	</label>
	<div class="flex justify-end gap-3">
		<form on:submit|preventDefault={() => ($params.where = where)} class="join flex-1">
			<input
				bind:value={where}
				name="where"
				class="input border-gray-700 join-item w-full"
				placeholder="experiment.name = azeem_2"
			/>
			<button type="submit" class="btn join-item">
				<IconDatabaseSearch class="text-lg" />
			</button>
		</form>

		<Pagination count={data.count} currentPage={$params?.page} itemsPerPage={data.itemsPerPage} />
	</div>
</div>

<DataTable rows={data.items}>
	<svelte:fragment slot="head">
		<DataTableHeaderCell bind:orderState field="id">#</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="experiment_name">Experiment</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_words_per_topic">
			Words / Topic
		</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_similar_words_per_word">
			Sim. Words / Word
		</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="min_document_frequency">
			Min. Doc. Freq.
		</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_topics">Num. Topics</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_scopus_results">Num. Results</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_gs_in_scopus">GS in Results</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_qgs_in_scopus">
			QGS in Results
		</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_gs_in_bsb">GS in BSB</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="n_gs_in_sb">GS in SB</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="start_set_precision">
			Sts. Precision
		</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="start_set_recall">Sts. Recall</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="start_set_f1_score">
			Sts. F1-Score
		</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="bsb_recall">BSB Recall</DataTableHeaderCell>
		<DataTableHeaderCell bind:orderState field="sb_recall">SB Recall</DataTableHeaderCell>
	</svelte:fragment>

	<svelte:fragment slot="row" let:row>
		<th>{row.id}</th>
		<td>
			{row.experiment_name}
		</td>
		<td>
			{row.n_words_per_topic}
		</td>
		<td>
			{row.n_similar_words_per_word}
		</td>
		<td>
			{row.min_document_frequency}
		</td>
		<td>
			{row.n_topics}
		</td>
		<td>
			{row.n_scopus_results}
		</td>
		<td>
			{row.n_qgs_in_scopus}
		</td>
		<td>
			{row.n_gs_in_scopus}
		</td>
		<td>
			{row.n_gs_in_bsb}
		</td>
		<td>
			{row.n_gs_in_sb}
		</td>
		<td>
			{row.start_set_precision}
		</td>
		<td>
			{row.start_set_recall}
		</td>
		<td>
			{row.start_set_f1_score}
		</td>
		<td>
			{row.bsb_recall}
		</td>
		<td>
			{row.sb_recall}
		</td>
	</svelte:fragment>
</DataTable>
