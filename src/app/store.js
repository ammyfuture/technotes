import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer, auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

// okay so the reducer gets a computed var name that will result to api
// its value is that exported reducer.reducer
// the slice creates actions and reducers and we get access to them though .reducer or .action
// then we have the middleware this takes the redux middle and concat the rtk query middle that comes with each slice
// so from the slice we can get the reducers, the actions and the middleware
// last is an option to enable devtools, not sure if it doesn't work otherwise but yeah cool

//---------------------------

// an issue that could happen :
// if this was open on more than one employees screen or staff member, we might get some stale data after its been open for awhile so we also want to refresh the data sporadically we can do that with rtk query and redux less see

// this guy enables things we can use now with our queries in the users list and notes, so basically allows us to configure our hooks specifically the get users and assuming get notes and solve the issue he was talking about about stale data

setupListeners(store.dispatch);

// this is the redux store
// we import configStore from redux tol kit and apiSlice from apiSlice and setupListeners from redux-tool/query
// then we create our store using config store inside it we have : 1- reducer similar to reducer and we pass the reducer we made so we pass apiSlice.reducer once u create a slice some stuff are made auto like reducer, actions, middleware and something els, here the reducer is using var computation technique we pass brackets and we pass the prop inside apiSlice that has the name, so [apiSlice.reducerPath] and pass the apiSlice.reducer so reducerPath gets the name, reducer passes the whole reducer
// then we have the middleware and we must do this, because the middleware of rtk are special and handle things that are important but just the normal redux middleware cant so we pass the apiSlices reducer and we do this by using the middleware prop then passing getDefaultMiddleWare this is a function that returns an array of all redux reducers and then we take that arg func we call it then we call concat and we concat the apiSlice.middleware so now its one big array with the default middle and rtk middle or api middle
// last one is the devTools and we pass true so we can use it
// last thing is a new addition, we have the setUpListeners from query and we call store.dispatch but i forgot the purpose let me read the code and see.

// okay the setupListeners and then inside store.dispatch is to avoid stale data,

// so this is our store
// next step go to index.js and import Provider from redux and wrap it around the app and pass store as the context so now our store has access to our reducers
