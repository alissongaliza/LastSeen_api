import { Genre } from './Genre';
import { Streaming } from './Streaming';

export class Movie {
	id: number;
	title: string;
	genres: Genre[];
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
	constructor(
		id: number,
		title: string,
		genres: Genre[],
		original_language: string,
		original_title: string,
		overview: string,
		popularity: number,
		release_date: string,
		runtime: number,
		tagline: string,
		vote_average: number,
		vote_count: number,
		poster_path: string,
		poster_fullPath: string,
		streamingServices: Streaming[]
	) {
		this.id = id;
		this.title = title;
		this.genres = genres;
		this.original_language = original_language;
		this.original_title = original_title;
		this.overview = overview;
		this.popularity = popularity;
		this.release_date = release_date;
		this.runtime = runtime;
		this.tagline = tagline;
		this.vote_average = vote_average;
		this.vote_count = vote_count;
		this.poster_path = poster_path;
		this.poster_fullPath = poster_fullPath;
		this.streamingServices = streamingServices;
	}
}
