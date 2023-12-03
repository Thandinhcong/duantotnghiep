import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFindJob } from "../../interfaces";
const FindJobCompanyApi = createApi({
  reducerPath: "findJobs",
  tagTypes: ["FindJobs"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authCompany");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getFindCandidate: builder.query<IFindJob, void>({
      query: () => "/company/find_candidate",
      providesTags: ["FindJobs"],
    }),
    getProfileOpen: builder.query<IFindJob, void>({
      query: () => "/company/profile_open",
      providesTags: ["FindJobs"],
    }),
    getProfileSave: builder.query<IFindJob, void>({
      query: () => "/company/profile_save",
      providesTags: ["FindJobs"],
    }),

    openProfile: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/company/open_profile/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["FindJobs"],
    }),
    saveProfile: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/company/save_profile/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["FindJobs"],
    }),
    cancelSaveProfile: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/company/cancel_save_profile/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["FindJobs"],
    }),
  }),
});
export const {
  useGetFindCandidateQuery, //Hiển thị ứng viên bật tìm việc
  useGetProfileOpenQuery, //Hiển thị ứng viên đã mở khoá
  useGetProfileSaveQuery,
  // useGetCandidateDetailQuery,
  useOpenProfileMutation,
  useSaveProfileMutation,
  useCancelSaveProfileMutation,
} = FindJobCompanyApi;

export const FindJobCompanyReducer = FindJobCompanyApi.reducer;
export default FindJobCompanyApi;
