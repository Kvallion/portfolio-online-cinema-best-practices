import { toastr } from "react-redux-toastr"
import { appApi } from "@shared/api/appApi"
import { Movie } from "../model/movie.types"
import { MovieEditFormState } from "@widgets/MovieEditForm/components/MovieEditForm/MovieEditForm.types"
import { Genre } from "@entities/genre"

const movieApi = appApi.injectEndpoints({
	endpoints: builder => ({
		getAllMovies: builder.query<Movie[], string | undefined>({
			query: (searchTerm?) => ({
				url: "/movies",
				params: { searchTerm },
			}),
			providesTags: (result, error, arg) => {
				let movies: { type: "Movie"; id: string }[] = []
				if (result)
					movies = result.map(m => ({ type: "Movie", id: m._id }))
				return [...movies, "Movie"]
			},
		}),
		getMovieById: builder.query<Movie, string>({
			query: id => `/movies/${id}`,
			providesTags: (result, error, id) => [{ type: "Movie", id }],
		}),
		getMovieBySlug: builder.query<Movie, string>({
			query: slug => `/movies/by-slug/${slug}`,
			providesTags: (result, error, id) => [
				result ? { type: "Movie", id: result._id } : "Movie",
			],
		}),
		getMoviesByGenres: builder.query<Movie[], string[]>({
			query: genreIds => ({
				url: `/movies/by-genres`,
				method: "POST",
				body: { genreIds },
			}),
			providesTags: (result, error, arg) => {
				let movies: { type: "Movie"; id: string }[] = []
				if (result)
					movies = result.map(m => ({ type: "Movie", id: m._id }))
				return [...movies, "Movie"]
			},
		}),
		getMoviesByActor: builder.query<Movie[], string>({
			query: actorId => `/movies/by-actor/${actorId}`,
			providesTags: (result, error, arg) => {
				let movies: { type: "Movie"; id: string }[] = []
				if (result)
					movies = result.map(m => ({ type: "Movie", id: m._id }))
				return [...movies, "Movie"]
			},
		}),
		getPopularMovies: builder.query<Movie[], void>({
			query: () => "/movies/most-popular",
			transformErrorResponse(error: any, meta) {
				toastr.error(
					"Failed to fetch popular movies",
					(error.error as string) || ""
				)
				return error
			},
		}),
		createMovie: builder.mutation<string, void>({
			query: () => ({
				url: `/movies`,
				method: "POST",
			}),
			invalidatesTags: ["Movie"],
		}),
		updateMovie: builder.mutation<
			string,
			MovieEditFormState & { _id: string }
		>({
			query: movie => ({
				url: `movies/${movie._id}`,
				method: "PUT",
				body: movie,
			}),
			invalidatesTags: (result, error, movie) => [
				{ type: "Movie", id: movie._id },
			],
		}),
		deleteMovie: builder.mutation<string, string>({
			query: id => ({
				url: `genres/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Genre", id }],
		}),
	}),
})

export const {
	useGetAllMoviesQuery,
	useGetMovieByIdQuery,
	useGetMovieBySlugQuery,
	useGetMoviesByActorQuery,
	useGetMoviesByGenresQuery,
	useGetPopularMoviesQuery,
	useCreateMovieMutation,
	useUpdateMovieMutation,
	useDeleteMovieMutation,
} = movieApi

export const {
	getAllMovies,
	getMovieById,
	getMovieBySlug,
	getMoviesByActor,
	getMoviesByGenres,
	getPopularMovies,
} = movieApi.endpoints
