export type Base = {
	type: string;
};

export type ImageComponent = Base & {
	type: 'image';
	src: string;
	ratio: number | 'vh';
};

export type AnotherTestComponent = Base & {
	type: 'another-one';
	djKhaled: boolean;
};

export type Component = ImageComponent | AnotherTestComponent;

export type Data = {
	components: Component[];
};
