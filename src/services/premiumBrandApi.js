/* eslint-disable no-unused-vars */
import { apiSlice } from "./apiSlice";

export const premiumBrandAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //GET ONLY BRANDS
    getOnlyPremiumBrands: builder.query({
      query: () => ({
        url: `/premiumBrands/only-brands`,
        method: "GET",
      }),
      invalidatesTags: ["Admin"],
    }),

    //GET VARIANT means Model
    getPremiumVariants: builder.query({
      query: (brand) => ({
        url: `/premiumBrands/variants`,
        method: "GET",
        params: { brand },
      }),
      providesTags: ["Admin"],
    }),

    // GET SUB-VARIANT
    getPremiumSubVariants: builder.query({
      query: ({ brand, variant }) => ({
        url: `/premiumBrands/sub-variants`,
        method: "GET",
        params: { brand, variant },
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {

  useGetOnlyPremiumBrandsQuery,
  useGetPremiumVariantsQuery,
  useGetPremiumSubVariantsQuery
} = premiumBrandAPI;
