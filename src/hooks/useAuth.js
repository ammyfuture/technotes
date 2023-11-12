import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  // get the token coming from the server
  const token = useSelector(selectCurrentToken);
  // create these placeholder boolean vars for manager and admin and status for employee because thats a given
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  // if there is a token then
  if (token) {
    // decode the token
    const decoded = jwtDecode(token);
    // extract the username and roles from the decoded
    const { username, roles } = decoded.UserInfo;

    // add another var to roles, add isManger and make it equal to manager and same for admin
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    // change the value of status based on the value of manager and admin but this seems like it'll over right? idk
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    // return username, roles, status and is manager and is admin
    return { username, roles, status, isManager, isAdmin };
  }
  // return an obj with username is empty an roles is empty array and is manager and is amin and status if there is no token
  // so user empty, roles empty manager false admin false and status employee
  return { username: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;

// not sure where this one is used and don't comp get the roles bit so lets see
