import {iMovie, MOVIE_CATEGORIES, stringToCat} from "../types/app.types";
import axios from "axios";

const categorySelector = document.querySelector<HTMLSelectElement>("#moviesCategories")!;
const movieSearchInput = document.querySelector<HTMLInputElement>("#movie-search")!;
const movieGrid = document.querySelector<HTMLDivElement>("#movieGrid")!;

const API_URL: string = "https://api.themoviedb.org/3"
const API_KEY: string = "881c3d7f0e31a65d7ef2c972773ad7d3";

export class MovieHandler {
    protected movies: iMovie[] = [];
    protected category: MOVIE_CATEGORIES = MOVIE_CATEGORIES.UPCOMING;
    private page: number = 1;
    private userIsSearching = false;

    constructor() {
        this.init();
        this.loadEventListeners();
    }

    private init = (): void => {
        categorySelector.value = this.category;
        this.fetchMoviesByCategory(this.page, this.category).then(data => {
            this.movies = data;
            this.page++;
            this.injectMovies();
        })
    }

    private injectMovies = (): void => {
        this.movies.forEach(movie => {
            movieGrid.innerHTML += `
            <div class="w-11/12 bg-blue-200 rounded-md shadow-md p-10 mx-auto">
                <p class="text-center mb-5 text-xl font-bold">${movie.title}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-11/12 mx-auto">
                <p class="mt-10 text-center">Votes: ${movie.vote_average} ⭐️</p>
            </div> 
       `
        });
    }

    private handleCategoryChange = (): void => {
        // @ts-ignore
        this.category = stringToCat(categorySelector.value);
        this.page = 1;
        this.fetchMoviesByCategory(this.page, this.category).then(data => {
            this.clearMovies();
            this.movies = data;
            this.page = 1;
            this.injectMovies();
        })
    }

    private handleInputType = (e: KeyboardEvent): void => {
        if (movieSearchInput.value.length === 0) {
            categorySelector.value = this.category;
            this.fetchMoviesByCategory(this.page, this.category).then(data => {
                this.movies = data;
                this.page++;
                this.injectMovies();
            })
            this.userIsSearching = false;
        }
        if (movieSearchInput.value.length < 3) return;
        this.userIsSearching = true;
        this.page = 1;
        this.searchMovies(movieSearchInput.value, this.page).then(data => {
            this.clearMovies();
            this.movies = data;
            this.page = 1;
            this.injectMovies();
        })
    }

    private clearMovies = (): void => {
        movieGrid.innerHTML = "";
        this.movies = [];
    }

    private fetchMoviesByCategory = (page: number, category: MOVIE_CATEGORIES) => {
        const promise = axios.get(`${API_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`);
        return promise.then(response => response.data.results);
    }

    private searchMovies = (query: string, page: number) => {
        const promise = axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}&include_adult=false`);
        return promise.then(response => response.data.results);
    }

    private loadEventListeners = (): void => {
        categorySelector.addEventListener("change", this.handleCategoryChange);
        movieSearchInput.addEventListener("keyup", this.handleInputType);
    }
}