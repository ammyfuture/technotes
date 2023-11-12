import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const DashFooter = () => {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // navigate here holds the value of /dash
  const onGoHomeClicked = () => navigate("/dash");
  let goHomeBtn = null;
  // goal only show the btn if we aren't on /dash if we are on /dash don't show
  if (pathname !== "/dash") {
    goHomeBtn = (
      <button
        className="dash-footer__button icon-button"
        title="home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeBtn}
      <p>Current: {username} ..</p>
      <p>Status: {status}..</p>
    </footer>
  );
  return content;
};
export default DashFooter;
/*
so we get the pathname from the useLocation obj and we get the navigate from useNavigate and then we create a button and we make it null then we create a func that will be used for the btn if we are not on the dash path page we will hold an icon thats a home inside the btn and the func once clicked will navigate us to dash
this page basically is a page for the footer and we have a code solution for how to go home here if we aren't home

*/

/**
 * we have icon imports and we have useLocation and useNavigate imports
 * we are extracting pathname from useLocation not sure how it works so need to go figure that out
 * then we have a func onGoHomeClicked so when we click the button this function is gonna be attached to we will o home and inside the function what makes us go home is useNav and the path of home which home in this app will be /dash
 * should have been on dashClicked because we are going to /dash not /home but whatever
 * after we have goHomeBtn and the value equals null
 * then we have an if that says if the pathName is not equal to /dash then then goHome will hold this value instead and that value is a button that has a className of blah and title of blah and the thing we care about is what func will o off when its clicked and its onGoHomeClicked and this btn will have a fontAwesome as the value and thats that
 * what does all of that mean? will basically if the path that useLocation is tracking is anything other than /dash then once the going back home icon gets clicked we will go to home so useLocation must be tracking the path at all times? hmm let me figure that out
 * then at last we have a content section and inside it we have a goHomeBtn so the value will either be null or there will be a goHome and under it there is current and status i think we didn't get time to work on it yet
 * then we just return content ... now lets ask chat
 *
 *
 *
 *
 */
