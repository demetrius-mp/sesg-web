import { getParams } from '$lib/queries/params';
import type { PageServerLoad } from './$types';

export const load = async function ({ url }) {
	const itemsPerPage = 100;

	const page = parseInt(url.searchParams.get('page') || '1', 10);
	const orderBy = (url.searchParams.get('orderBy') || 'id asc').split(',');

	const { items, count } = await getParams<{
		min_document_frequency: number;
		n_topics: number;
	}>({
		join: 'join lda_params ON lda_params.id = params.lda_params_id',
		select: 'lda_params.min_document_frequency, lda_params.n_topics',
		limit: itemsPerPage,
		offset: (page - 1) * itemsPerPage,
		orderBy
	});

	return {
		items,
		count,
		itemsPerPage
	};
} satisfies PageServerLoad;
