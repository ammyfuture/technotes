import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// this is the log in func from the authApiSlice
import { setCredentials } from "../../features/auth/authSlice";

// here we get the fetch func and write it outside the createApi and make it more complicated
const baseQuery = fetchBaseQuery({
  // the url is the same
  // baseUrl: "https://technotes-api.onrender.com",
  baseUrl: "https://technotes-api.onrender.com",
  // not sure what this is? maybe include credentials, i  am guessing pass and username
  credentials: "include",
  // a func, takes a header and a getState from within an obj?
  prepareHeaders: (headers, { getState }) => {
    // getState maybe works like action.payload? when called it has an auth prop and a token prop, where is this coming from?
    const token = getState().auth.token;
    // so we got the token if its there we
    if (token) {
      // access the headers from the arg and call set method and we do what we do in postman we pass the header type and then we pass the string that starts with Bearer
      headers.set("authorization", `Bearer ${token}`);
    }
    // we return the headers, so goal of prepare header is getting the token and passing it
    return headers;
  },
});

// this is another func, the previous was a func that takes an obj before it was just baseQuery now it takes other things like include cred and prepare headers getting the token and passing in header.
// What does this one do?
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // args, api, extraOptions what are these?

  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  // we have a result var here we call baseQuery we pass a func to it, so it returns a func too, the func requires, args, api and extra options?
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  // if result has err thats 403 then return sending refresh token, so i guess 403 means expired access expired
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    // we call baseQuery again and we pass a path for first arg and its to the refresh token path and then we pass api and then we pass extraOptions and that will get us the refresh result
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    // if the refresh has data so the refresh token
    if (refreshResult?.data) {
      // store the new token
      // we call api.dispatch and we pass the log in action so here is where the log in action.payload gets the refresh token from and then what tho
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      // re try the original query now which should give us the access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // this is if the refresh expired i'm guessing
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      // return the refresh result but umm is that all to getting the new refresh token?
      // so we get the expired result too if it gets expired what will we do with it?
      return refreshResult;
    }
  }
  // here we return the result
  return result;
};

// we pass the func using the previous baseQuery here no name for api here for some reason ..
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});

// this code creates an apiSlice that works with rtk query
// we get create and fetch from redux tool kit, rtk is the fetching way of redux and just react has another
// we then use create to create an obj with 1- reducer path which is the name of the reducer 2- baseQuery which is calls the function fetchBaseQuery that gets the backend url that we are supposed to send our requests to and et requests back from so it takes an obj with the baseUrl prop
// then we have the tag types, so when we use them to validate and invalidate a specific data we pass the name of that tag group and the cashing can go and work with that group specifically
// then we have endpoints which here in this example with pass the builder as arg and the value is an empty obj
