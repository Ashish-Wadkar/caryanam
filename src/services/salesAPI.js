import { apiSlice } from "./apiSlice";

export const salesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeller: builder.query({
      query: ({pageNo,pageSize}) => ({
        url: `/salesPerson/GetAllInspProfiles?pageNo=${pageNo}&pageSize=${pageSize}`,
        
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "SALESPERSON", pageNo: result.pageNo }] : [],
    }),
    deleteSeller: builder.mutation({
      query: (id) => ({
        url: `/salesPerson/deletById/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SALESPERSON"],
    }),
    sellerById: builder.query({
      query: ({userId}) => ({
        url: `/salesPerson/getByUserId?userId=${userId}`,
        // transerResponse: console.log(userId),
        method:"GET"
      }),
      providesTags: ["SALESPERSON" ,"User"],
    }),


    sellerupdate: builder.mutation({
      query: ({id, salesdata}) => ({
        url: `/salesPerson/updateSPersonDetails?salesPersonId=${id}`,
        method: "PATCH",
        // transerResponse: console.log("API response",salesdata,id),
        body: salesdata,
      }),
      invalidatesTags: ["SALESPERSON"],
    }),

    sellerChangePassword : builder.mutation({
      query : ({passChange,salesPersonId}) => ({
        url : `/salesPerson/passwordChange/${salesPersonId}`,
        method: "PUT",
        body : passChange,
        // transerResponse:console.log(salesPersonId,passChange),
       
      })
      
    }),
    b2bstatuCheck : builder.query({
      query : ({status}) => ({
        url : `/b2b/by-status?requestStatus=${status}`,
        method: "GET",
      }),
      invalidatesTags: ["SALESPERSON"],
      
    }),
    b2bAssingMesection : builder.mutation({
      query : ({assingData,b2BId}) => ({
        url : `/b2b/update?b2BId=${b2BId}`,
        method: "PATCH",
        body:assingData,
          transerResponse:console.log(assingData,b2BId),
       
      }),
      invalidatesTags: ["SALESPERSON"],
      
    }),
    getB2BSalesPersonId : builder.query({
      query : (salesPersonId) => ({
        url : `/b2b/by-sales-person?salesPersonId=${salesPersonId}`,
        method: "GET",
      }),
      invalidatesTags: ["SALESPERSON"],
      
    }),
    addB2BConfirmationApi : builder.mutation({
      query : (formData) => ({
        url : `b2bConfirm/add`,
        method: "POST",
        body : formData
      }),
      invalidatesTags : ["SALESPERSON"]
    }),
    getB2BconfirmSalePerson : builder.query({
      query : (salesPersonId) => ({
        url : `/b2bConfirm/salespersonId?salesPersonId=${salesPersonId}`,
        method: "GET",
      }),
      invalidatesTags: ["SALESPERSON"],
      
    }),

  }),
});

export const {
  useGetAllSellerQuery,
  useDeleteSellerMutation,
  useSellerByIdQuery,
  useSellerupdateMutation,
  useSellerChangePasswordMutation,
  useB2bstatuCheckQuery,
  useB2bAssingMesectionMutation,
  useGetB2BSalesPersonIdQuery,
  useAddB2BConfirmationApiMutation,
  useGetB2BconfirmSalePersonQuery
} = salesAPI;
