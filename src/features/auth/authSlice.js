// to create a slice
import { createSlice } from "@reduxjs/toolkit";

// we create the slice its an auth slice
const authSlice = createSlice({
  // thats the name
  name: "auth",
  // first time init-state is written inside, simply an obj with token prop thats null we'll save the access token in this state it seems
  initialState: { token: null },
  //   our reducers, we have one for login and one for log out
  reducers: {
    //   log in just sets our state with the access token coming from the action.payload
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    // log out we return the state to null again
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

// we export our actions so we can use them with dispatch to trigger the actions to do the funcs stuff
export const { setCredentials, logOut } = authSlice.actions;
// this is exporting the reducer well pass it to the store so now we have access to it all over our app
export default authSlice.reducer;

// this is a selector that well use with useSelector that will give us access to the state in other parts of our code but not sure why we didn't use createSelector i thought we were all for memoization?
export const selectCurrentToken = (state) => state.auth.token;
// this selector simply just has access to the token tracking the obj from the state to the auth to the token
