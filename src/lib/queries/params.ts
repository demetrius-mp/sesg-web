import { db } from '$lib/server/db';

type MountParamsQueryOptions = {
	select: string;
	join: string;
	limit: number;
	offset: number;
	orderBy?: string[];
	where?: string;
};

export type BaseParamsQueryRow = {
	id: number;
	experiment_name: string;
	n_words_per_topic: number;
	n_similar_words_per_word: number;
	n_scopus_results: number;
	n_qgs_in_scopus: number;
	n_gs_in_scopus: number;
	n_gs_in_bsb: number;
	n_gs_in_sb: number;
	start_set_precision: number;
	start_set_recall: number;
	start_set_f1_score: number;
	bsb_recall: number;
	sb_recall: number;
	search_string: string;
};

export async function getParams<T extends Record<string, string | number>>(
	options: MountParamsQueryOptions
) {
	const { select, join, limit, offset, orderBy = [], where = '' } = options;

	const itemsQuery = `
select
params.id,
experiment.name as experiment_name,
formulation_params.n_words_per_topic,
formulation_params.n_similar_words_per_word,
${select},
search_string_performance.n_scopus_results,
search_string_performance.n_qgs_in_scopus,
search_string_performance.n_gs_in_scopus,
search_string_performance.n_gs_in_bsb,
search_string_performance.n_gs_in_sb,
search_string_performance.start_set_precision,
search_string_performance.start_set_recall,
search_string_performance.start_set_f1_score,
search_string_performance.bsb_recall,
search_string_performance.sb_recall,
search_string.string as search_string
from params
${join}
join formulation_params ON formulation_params.id = params.formulation_params_id
join search_string ON search_string.id = params.search_string_id
left join search_string_performance ON search_string_performance.search_string_id = search_string.id
join experiment ON experiment.id = params.experiment_id
${where}
${orderBy.length > 0 ? 'order by ' + orderBy.join(',') : ''}
limit ${limit} 
offset ${offset}
`;

	const countQuery = `
select
count(*)
from params
${join}
join formulation_params ON formulation_params.id = params.formulation_params_id
join search_string ON search_string.id = params.search_string_id
left join search_string_performance ON search_string_performance.search_string_id = search_string.id
join experiment ON experiment.id = params.experiment_id
${where}
`;

	const [items, count] = await Promise.all([
		db.$queryRawUnsafe<Array<BaseParamsQueryRow & T>>(itemsQuery),
		db.$queryRawUnsafe<[{ count: number }]>(countQuery)
	]);

	return {
		items,
		count: parseInt(String(count[0].count))
	};
}
