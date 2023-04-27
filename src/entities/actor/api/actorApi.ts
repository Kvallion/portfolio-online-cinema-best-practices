import { appApi } from "@shared/api/appApi"
import { Actor } from "../model/actor.types"

export const actorApi = appApi.injectEndpoints({
	endpoints: builder => ({
		getAllActors: builder.query<
			Actor[],
			{ searchTerm?: string; limit?: number } | undefined
		>({
			query: params => ({
				url: "/actors",
				params: params?.searchTerm
					? { searchTerm: params.searchTerm }
					: {},
			}),
			transformResponse(actors: Actor[], meta, arg) {
				if (Array.isArray(actors)) {
					return arg?.limit ? actors.slice(0, arg?.limit) : actors
				}
				return actors
			},
			providesTags: (result, error, arg) => {
				let actors: { type: "Actor"; id: string }[] = []
				if (result)
					actors = result.map(a => ({ type: "Actor", id: a._id }))
				return [...actors, "Actor"]
			},
		}),

		createActor: builder.mutation<string, void>({
			query: () => ({
				url: `/actors`,
				method: "POST",
			}),
			invalidatesTags: ["Actor"],
		}),
		deleteActor: builder.mutation<string, string>({
			query: id => ({
				url: `/actors/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Actor", id }],
		}),
	}),
})

export const {
	useGetAllActorsQuery,
	useDeleteActorMutation,
	useCreateActorMutation,
} = actorApi
export const { getAllActors } = actorApi.endpoints
