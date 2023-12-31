import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, ResponseUsers } from './user.types';
import { PATHS } from '../../../config/paths';
import { decodEditUser, decodGetUsers, decodUserById } from '../post/decoder';
import { DataUser } from '../auth/auth.api.types';
import { BASE_URL } from '../../../config/config';
import { setTokenToHeaders } from '../../../utils/setTokenToHeaders';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
    prepareHeaders(headers) {
      setTokenToHeaders(headers);
    },
  }),
  tagTypes: ['USERS'],

  // ______________________________________________________________ *** Get user ***___________________________________________________________

  endpoints: (builder) => ({
    // ______________________________________________________________ *** Get all users ***___________________________________________________________

    getUsers: builder.query({
      query(params) {
        console.log(params);
        let url = `${PATHS.USERS}?page=${params.page}&rowsPerPage=${params.rowsPerPage}&role=${params.role}`;

        if (params.search) {
          url = `${PATHS.USERS}?page=${Number(params.page)}&rowsPerPage=${
            params.rowsPerPage
          }&search=${params.search}`;
          console.log(params);
        }

        return {
          url,
        };
      },
      transformResponse: (result: ResponseUsers): ResponseUsers => {
        return decodGetUsers(result);
      },
      providesTags: ['USERS'],
    }),

    // ______________________________________________________________ *** Edit user ***___________________________________________________________

    updateUser: builder.mutation<IUser, { id: number; user: IUser }>({
      query: ({ id, user }) => ({
        url: `${PATHS.DASHBOARD.USERS}/${id}`,
        method: 'PATCH',
        body: user,
      }),
      transformResponse: (response: IUser) => decodEditUser(response),
      invalidatesTags: ['USERS'],
    }),

    // ______________________________________________________________ *** Get user by id***___________________________________________________________

    getUserById: builder.query<DataUser, { id: number }>({
      query: ({ id }) => ({
        url: `${PATHS.DASHBOARD.USERS}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: DataUser) => decodUserById(response),
    }),

    // ______________________________________________________________ *** Delete user ***___________________________________________________________

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `${PATHS.USERS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['USERS'],
    }),
  }),
});
export const {
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
} = userApi;
