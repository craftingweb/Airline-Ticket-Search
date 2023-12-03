import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cscticketapi.onrender.com/"
  }),
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "tickets",
    }),
    searchTicket: builder.mutation({
      query: (ticketData) => ({
        url: `api/flights/trips`,
        method: 'GET',
        params: {
          from: ticketData?.leavingPort,  
          to: ticketData?.goingPort,  
        },
      }),
    }), 
    getSingleTicket: builder.mutation({
      query: (id) => ({
        url: `api/reciepts/reciept`,
        method: 'GET',
        params: {
          id: id
        },
      }),
    }), 
    createReciept: builder.mutation({
      query: (payload) => ({
        url: `api/reciepts/create`,
        method: 'POST', 
        body:payload
      }),
    }), 
  }),
});

export const { useGetTicketsQuery, useSearchTicketMutation, useGetSingleTicketMutation, useCreateRecieptMutation } = ticketApi;

