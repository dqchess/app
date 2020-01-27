export type Alignment = 'left' | 'center' | 'right';

export type HeaderRaw = {
	text: string;
	value: string;
	align?: Alignment;
	sortable?: boolean;
};

export type Header = Required<HeaderRaw>;

export type ItemSelectEvent = {
	value: boolean;
	item: any;
};
