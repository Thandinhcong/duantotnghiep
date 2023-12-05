import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AdminLogin = createApi({
  reducerPath: "accountAdmin",
  tagTypes: ["AccountAdmin"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/admin",
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<
      { access_token: string; admin: {}; errors: string },
      { email: string; password: string }
    >({
      query: (data: any) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AccountAdmin"],
    }),
  }),
});
export const { useAdminLoginMutation } = AdminLogin;

export const adminLoginReducer = AdminLogin.reducer;

export default AdminLogin;
