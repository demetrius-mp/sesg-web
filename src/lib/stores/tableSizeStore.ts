import { persisted } from 'svelte-local-storage-store';

export type TableSize = 'table-xs' | 'table-sm' | 'table-md' | 'table-lg';

export const tableSizeStore = persisted<TableSize>('tableSize', 'table-xs');
