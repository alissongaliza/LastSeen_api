import { Genre } from './Genre';
import { Streaming } from './Streaming';

export type Movie = {
	id: number;
	title: string;
	genres: Genre[];
	genre_ids: number[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	release_date: string;
	runtime: number;
	tagline: string;
	vote_average: number;
	vote_count: number;
	poster_path: string;
	poster_fullPath: string;
	streamingServices: Streaming[];
};
