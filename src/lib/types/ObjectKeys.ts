type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

export type ObjectKeys<T> = (
	T extends object
		? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<ObjectKeys<T[K]>>}` }[Exclude<
				keyof T,
				symbol
		  >]
		: ''
) extends infer D
	? Extract<D, string>
	: never;
