import { apiSlice } from "./apiSlice";

export const enquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Enquiry
    createEnquiry: builder.mutation({
      query: (enquiryData) => ({
        url: "/enquiry/createEnquiry",
        method: "POST",
        body: enquiryData,
      }),
      invalidatesTags: ["Enquiry"],
    }),
     }),
  });
  export const {
     useCreateEnquiryMutation
  } = enquiryApi;