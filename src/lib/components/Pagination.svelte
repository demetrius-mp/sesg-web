<script lang="ts">
	import { page } from '$app/stores';
	import IconChevronLeft from '~icons/mdi/ChevronLeft';
	import IconChevronRight from '~icons/mdi/ChevronRight';
	import IconChevronDoubleLeft from '~icons/mdi/ChevronDoubleLeft';
	import IconChevronDoubleRight from '~icons/mdi/ChevronDoubleRight';

	export let currentPage = 1;
	export let itemsPerPage: number;
	export let count: number;

	function createPaginationHref(page: number) {
		const url = $page.url.pathname;
		$page.url.searchParams.set('page', page.toString());

		return url + '?' + $page.url.searchParams.toString();
	}

	$: totalPages = Math.ceil(count / itemsPerPage);
	$: start = currentPage * itemsPerPage - itemsPerPage + 1;
	$: end = Math.min(currentPage * itemsPerPage, count);
</script>

<div class="flex flex-col items-center">
	<div class="join">
		<a
			href={createPaginationHref(1)}
			class="join-item btn"
			class:pointer-events-none={currentPage === 1}
		>
			<IconChevronDoubleLeft />
		</a>
		<a
			href={createPaginationHref(currentPage - 1)}
			class="join-item btn"
			class:pointer-events-none={currentPage === 1}
		>
			<IconChevronLeft />
		</a>
		<span class="join-item btn pointer-events-none">
			Page {currentPage}
		</span>
		<a
			href={createPaginationHref(currentPage + 1)}
			class="join-item btn"
			class:pointer-events-none={currentPage === totalPages}
		>
			<IconChevronRight />
		</a>
		<a
			href={createPaginationHref(totalPages)}
			class="join-item btn"
			class:pointer-events-none={currentPage === totalPages}
		>
			<IconChevronDoubleRight />
		</a>
	</div>

	<small class="self-end mt-1">
		{start} to {end} of {count}
	</small>
</div>
