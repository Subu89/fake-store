import apiSlice from "../api/apiSlice";
import { Login } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: { data },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: response?.data?.token,
              user: response?.data?.user,
            })
          );

          dispatch(
            Login({
              accessToken: response?.data?.token,
              user: response?.data?.user,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // fetched all users
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // fetch user by id
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),

    // Add user
    addUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Users"],
    }),

    // Update user
    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      // optimistic cache update start from here
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
            const user = draft?.find((c) => c.id === arg);
            const userIndex = draft?.indexOf(user);
            if (userIndex !== -1) {
              draft?.splice(userIndex, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
        }
      },
      // optimistic cache update end from here
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useLoginMutation,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApi;
