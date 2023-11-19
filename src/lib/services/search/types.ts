export type SearchResultGroupItem = {
	icon: string | null;
	url: string;
	label: string;
};

export type SearchResultGroup = { title: string; items: SearchResultGroupItem[] };

export type SearchResult = { groups: SearchResultGroup[] };
