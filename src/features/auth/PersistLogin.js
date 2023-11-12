import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  // persist is either holding some value or is false
  const [persist] = usePersist();
  // i don't think we made this selector before? lets see but it extracts the token from the store
  const token = useSelector(selectCurrentToken);
  // not sure whats going on here i don't think i've seen useRef take a value
  const effectRan = useRef(false);

  // so this state holds a boolean either true or false and it starts with false
  const [trueSuccess, setTrueSuccess] = useState(false);

  // we are getting the refresh mutation i forgot what it does tbh
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  // useEffect, inside we ask if the useRef current is equal to true or process.env.node_Env is not equal to dev so if we are in production then
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      // make this func and log verifying the refresh token
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          // we await a func called refresh, where does it come from? oh from the mutation i'm guessing this gets a new refresh?
          //const response =
          await refresh();
          //const { accessToken } = response.data
          //   then we set the the success to true
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      // if there is no token and no persist or if token equal to false and persist too then call the verify func up which gets a new refresh and then a new token...
      if (!token && persist) verifyRefreshToken();
    }

    //   clean up which makes the useRef to true
    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  // content is a let
  let content;
  // if persist is false
  if (!persist) {
    // persist: no
    //   log no persist
    console.log("no persist");
    //   and content is just outlet, so i'm assuming this will wrap around something maybe the whole app but not the public ones
    content = <Outlet />;
    //   but if isLoading is true then log loading and content is loading
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <p>Loading...</p>;
    //   else if isErr is true then log err and content is the err.data.message and link to log in again
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
    //   but if isSuccess and trueSuccess then log success and content is outlet and last is if there is a token and isUnInit from the mutation then log some and pass the outlet ...hmm
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  // returning the content
  return content;
};
export default PersistLogin;
