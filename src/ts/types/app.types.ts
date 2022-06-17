export interface iMovie {
    adult: boolean;
    backdrop_path: string;
    genre_id: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum MOVIE_CATEGORIES {
    TOP_RATED = "top_rated",
    UPCOMING = "upcoming",
    NOW_PLAYING = "now_playing",
    POPULAR = "popular"
}

export const stringToCat = (category: string): MOVIE_CATEGORIES => {
    switch (category) {
        case "top_rated":
            return MOVIE_CATEGORIES.TOP_RATED;
        case "upcoming":
            return MOVIE_CATEGORIES.UPCOMING;
        case "now_playing":
            return MOVIE_CATEGORIES.NOW_PLAYING;
        case "popular":
            return MOVIE_CATEGORIES.POPULAR;
        default:
            return MOVIE_CATEGORIES.UPCOMING;
    }
}