import { apiSlice } from "./apiSlice";

export const colorAPI = apiSlice.injectEndpoints({

endpoints: (builder) => ({

getAllColor : builder.query({

  query: () => ({

    url:`/colors/getAll`,

    method: "GET",
  }),
  providesTags:["Dealer", "User"],

}),

//POST
addColor: builder.mutation({
  query: (carColor) => ({
    url: `/colors/add`,
    method: "POST",
    
    body: carColor,
  }),
  invalidatesTags:["Admin"]
}),

//GET Color Names
getColorName: builder.query({
  query: () => ({
    url: `/colors/names`,
    method: "GET",
  }),
  invalidatesTags: ["Admin"],
}),

//PUT
editColorData: builder.mutation({
  query: ({ inputField, id }) => ({
    url: `/colors/edit?id=${id}`,
    method: "PUT",
    transferResponse: console.log(id),
    body: inputField,
  }),
  providesTags: ["Admin"],
}),

//DELETE
deleteColor: builder.mutation({
  query: (colorId) => ({
    url: `/brands/delete?id=${colorId}`,
    method: "DELETE",
    
  }),
  invalidatesTags: ["Admin"],
}),

}),

});

export const {
  useAddColorMutation,
  useGetAllColorQuery,
  useGetColorNameQuery,
  useEditColorDataMutation,
  useDeleteColorMutation,

  
} = colorAPI;








