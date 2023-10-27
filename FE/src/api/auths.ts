import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const authApi = createApi({
    reducerPath: "auth",
    tagTypes: ['Auths'],

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CANDIDATE,

        fetchFn: (...arg) => {
            return fetch(...arg)
        },
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("user") as string);
            const token = user?.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }

    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ access_token: string, user: {}, status: string }, { email: string, password: string }>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        signup: builder.mutation<{ access_token: string, users: {}, errors: string }, { name: string, email: string, password: string, phone: string, password_confirmation: string }>({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: credentials
            })

        }),
        getInfoUser: builder.query<any, void>({
            query: () => "/candidate_information",
            providesTags: ['Auths']
        }),
        logOut:builder.mutation<void,void>({
            query:(data)=>({
                url:"/candidate/logout",
                method:"DELETE",
                body:data
            })
        })
    })
})
export const {
    useGetInfoUserQuery,
    useLoginMutation,
    useSignupMutation,
    useLogOutMutation
} = authApi;
export const authsReducer = authApi.reducer;
export default authApi;