import {iMovie, MOVIE_CATEGORIES, stringToCat} from "../types/app.types";
import axios from "axios";
import MicroModal from "micromodal";

const categorySelector = document.querySelector<HTMLSelectElement>("#moviesCategories")!;
const movieSearchInput = document.querySelector<HTMLInputElement>("#search-input")!;
const movieGrid = document.querySelector<HTMLDivElement>("#movies-grid")!;

const API_URL: string = "https://api.themoviedb.org/3"
const API_KEY: string = "881c3d7f0e31a65d7ef2c972773ad7d3";

export class MovieHandler {
    protected movies: iMovie[] = [];
    protected category: MOVIE_CATEGORIES = MOVIE_CATEGORIES.UPCOMING;
    private page: number = 1;
    private limit: number = 30;
    private total: number = -1;
    private userIsSearching = false;

    constructor() {
        MicroModal.init();
        this.init();
        this.loadEventListeners();
    }

    private init = (): void => {
        categorySelector.value = this.category;
        this.fetchMoviesByCategory(this.page, this.category).then(data => {
            this.total = data.total_results;
            this.movies = data.results;
            this.page++;
            this.injectMovies();
        })
    }

    private injectMovies = (): void => {
        this.movies.forEach((movie: iMovie) => {
            movieGrid.innerHTML += this.renderMovieCard(movie);
        });
    }

    private handleCategoryChange = (): void => {
        movieSearchInput.value = "";
        this.category = stringToCat(categorySelector.value);
        this.page = 1;
        this.fetchMoviesByCategory(this.page, this.category).then(data => {
            this.clearMovies();
            this.total = data.total_results;
            this.movies = data.results;
            this.page = 1;
            this.injectMovies();
        })
    }

    private handleInputType = (e: KeyboardEvent): void => {
        if (movieSearchInput.value.length === 0) {
            categorySelector.value = this.category;
            this.fetchMoviesByCategory(this.page, this.category).then(data => {
                this.movies = data.total_results;
                this.total = data.total_pages;
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
            this.movies = data.results;
            this.total = data.total_results;
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
        return promise.then(response => response.data);
    }

    private searchMovies = (query: string, page: number) => {
        const promise = axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}&include_adult=false`);
        return promise.then(response => response.data);
    }

    private endlessScroll = (): void => {
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 &&
            this.hasMoreMovies(this.page, this.limit, this.total)) {
            this.page++;
            if (this.userIsSearching) {
                this.searchMovies(movieSearchInput.value, this.page).then(data => {
                    this.movies = [...this.movies, data.results];
                    data.results.forEach((movie: iMovie) => {
                        movieGrid.innerHTML += this.renderMovieCard(movie);
                    });
                })
            } else {
                this.fetchMoviesByCategory(this.page, this.category).then(data => {
                    this.movies = [...this.movies, data.results];
                    data.results.forEach((movie: iMovie) => {
                        movieGrid.innerHTML += this.renderMovieCard(movie);
                    });
                });
            }
        }
    }

    private hasMoreMovies = (page: number, limit: number, total: number) => {
        const startIndex: number = (page - 1) * limit + 1;
        return total === 0 || startIndex < total;
    }

    private renderMovieCard = (movie: iMovie) => {
        return `
            <div class="w-11/12 bg-blue-200 rounded-md shadow-md p-10 mx-auto text-center flex flex-col movie-card">
                <p class="text-center mb-5 text-lg font-bold movie-title">${movie.title}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-11/12 mx-auto movie-poster">
                <p class="my-5 text-center movie-votes">Votes: ${movie.vote_average} ⭐️</p>
            </div> 
       `
    }

    private getMovieVideo = (id: number) => {
        const promise = axios.get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        return promise.then(response => response.data);
    }

    private toggleModal = (movie: iMovie) => {
        this.getMovieVideo(movie.id).then(data => {
            const title = document.querySelector<HTMLHeadingElement>("#movie-details-title")!;
            const content = document.querySelector<HTMLDivElement>("#movie-details-content")!;
            title.innerText = movie.title;
            content.innerHTML = `
            <iframe
                    src="https://www.youtube.com/embed/${data.results[0]}"
                    title="${movie.title}"
                    class="w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
        `
            MicroModal.show("movie-details")
        });
    }

    private loadEventListeners = (): void => {
        categorySelector.addEventListener("change", this.handleCategoryChange);
        movieSearchInput.addEventListener("keyup", this.handleInputType);
        window.addEventListener("scroll", this.endlessScroll, {passive: true});
    }
}