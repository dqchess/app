export type Alignment = 'left' | 'center' | 'right';

export type HeaderRaw = {
	text: string;
	value: string;
	align?: Alignment;
};

export type Header = Required<HeaderRaw>;
